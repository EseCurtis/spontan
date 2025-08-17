import prisma from "@/config/database";
import { JOB_STATUS } from "@/generated/prisma";
import { cancelScheduleSchema, scheduleSchema } from "@/schemas/scheduler.schema";
import { ndSheduler } from "@/utils/shared";
import axios from "axios";

type SchedulePayload = {
  rule: ndSheduler.RecurrenceRule;
  request: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // Restrict to common HTTP methods
    url: string;
    data?: unknown; // Replace 'any' with 'unknown' for safer typing
    headers?: Record<string, string>;
  };
  callbackUrl?: string;
};

export const schedulerService = {
  async persistJob({ rule, request, callbackUrl }: SchedulePayload, jobName: string) {
    return prisma.cron_job.create({
      data: {
        job_name: jobName,
        rule: JSON.stringify(rule),
        request: JSON.stringify(request),
        callback_url: callbackUrl
      },
      select: {
        uuid: true,
        createdAt: true,
        updatedAt: true
      }
    })
  },

  async updateJob({ name, persistUuid, payload }: { name?: string, persistUuid?: string, payload: { status: JOB_STATUS } }) {
    return prisma.cron_job.updateManyAndReturn({
      where: {
        OR: [
          { uuid: persistUuid },
          { job_name: name }
        ],
        NOT: [
          { status: JOB_STATUS.CANCELLED }
        ]
      },
      data: {
        status: payload.status
      }
    })
  },

  async schedule(payload: SchedulePayload, persist: boolean = true) {
    const rule = new ndSheduler.RecurrenceRule()
    rule.year = payload.rule.year
    rule.month = payload.rule.month
    rule.date = payload.rule.date
    rule.dayOfWeek = payload.rule.dayOfWeek
    rule.hour = payload.rule.hour
    rule.minute = payload.rule.minute
    rule.second = payload.rule.second
    payload.rule = rule;

    const isReoccurence = !(typeof payload.rule === "string")

    const job = ndSheduler.scheduleJob(payload.rule, async () => {
      const { request } = payload;
      axios({
        method: request.method,
        url: request.url,
        data: request.data,
        headers: request.headers
      }).then(response => {
        if (payload.callbackUrl) {
          axios.post(payload.callbackUrl, {
            status: response.status,
            data: response.data
          })
        }
      }).catch(error => {
        if (payload.callbackUrl) {
          axios.post(payload.callbackUrl, {
            status: error.response.status,
            data: error.response.data
          })
        }
      }).finally(() => {
        this.updateJob({
          name: job?.name,
          payload: {
            status: isReoccurence ? JOB_STATUS.RAN : JOB_STATUS.COMPLETED
          }
        })
      })
    });

    let persistUuid: string | null = null
    if (persist) {
      const persisted = await this.persistJob(payload, job?.name)
      persistUuid = persisted.uuid
    }

    return {
      message: "JOB SCHEDULED!",
      jobName: job?.name,
      persistUuid: persistUuid
    };
  },
  async cancelSchedule(job_name_or_persistUuid: string, permanentDeletion: boolean = false) {
    const cancelled = await this.updateJob({
      name: job_name_or_persistUuid,
      persistUuid: job_name_or_persistUuid,
      payload: {
        status: JOB_STATUS.CANCELLED
      }
    });

    cancelled.map(async (cancelledSchedule) => {
      ndSheduler.cancelJob(cancelledSchedule.job_name);
    });

    if (permanentDeletion) {
      await prisma.cron_job.deleteMany({
        where: {
          uuid: {
            in: cancelled.map(({ uuid }) => uuid)
          }
        }
      });
    }

    if (cancelled.length < 1) {
      return {
        message: "JOB NOT FOUND!",
        jobName: null,
        persistUuid: job_name_or_persistUuid,
        cancelledJobs: cancelled
      };
    }

    return {
      message: "JOB CANCELLED!",
      jobName: cancelled?.[0]?.job_name,
      persistUuid: cancelled?.[0]?.uuid,
      cancelledJobs: cancelled
    };
  },

  async getSchedule(job_name_or_persistUuid: string) {
    return prisma.cron_job.findMany({
      where: {
        OR: [
          { uuid: job_name_or_persistUuid },
          { job_name: job_name_or_persistUuid }
        ]
      }
    });
  },

  helpers: {
    async restoreSchedules() {
      const allJobs = await prisma.cron_job.findMany({
        where: {
          OR: [
            { status: JOB_STATUS.PENDING },
            { status: JOB_STATUS.RAN }
          ]
        }
      });

      const restored = await Promise.all(
        allJobs.map(async (job) => {
          console.log(`Restoring job: ${job.job_name}`);
          const rule = JSON.parse(String(job.rule));
          const request = JSON.parse(String(job.request));

          const payload = {
            rule,
            request,
            callbackUrl: job.callback_url
          } as SchedulePayload

          await schedulerService.schedule(payload, false)
        }));
      console.log(`Restored (${restored.length}) jobs`);
    },
    async clearSchedules() {
      const deleted = await prisma.cron_job.deleteMany({
        where: {
          OR: [
            { status: JOB_STATUS.COMPLETED },
            { status: JOB_STATUS.CANCELLED },
          ]
        }
      });
      console.log(`Deleted (${deleted.count}) jobs`);
    }
  },

  schemas: {
    schedule: scheduleSchema,
    cancelSchedule: cancelScheduleSchema
  },
};