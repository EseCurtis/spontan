import { ndSheduler } from "@/utils/shared";
import axios from "axios";
import z from "zod";

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

// Zod schema for validation
const scheduleSchema = z.object({
  rule: z.object({
    recurs: z.boolean(),
    year: z.number().nullable(),
    month: z.number().nullable(),
    date: z.number().nullable(),
    dayOfWeek: z.array(
      z.union([
        z.number(),
        z.object({
          start: z.number(),
          end: z.number(),
          step: z.number().optional(), // Step is optional in Range
        }),
      ])
    ).nullable(),
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
  }),
  request: z.object({
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
    url: z.string().url(), // Enforce valid URL format
    data: z.unknown().optional(),
    headers: z.record(z.string(), z.string()).optional(),
  }),
  callbackUrl: z.string().url().optional(), // Enforce valid URL if provided
});

export const schedulerService = {
  async schedule(payload: SchedulePayload) {
    const rule = new ndSheduler.RecurrenceRule()
    rule.year = payload.rule.year
    rule.month = payload.rule.month
    rule.date = payload.rule.date
    rule.dayOfWeek = payload.rule.dayOfWeek
    rule.hour = payload.rule.hour
    rule.minute = payload.rule.minute
    rule.second = payload.rule.second

    payload.rule = rule


    ndSheduler.scheduleJob(payload.rule, async () => {
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
      })
    });

    return {
      message: "JOB SCHEDULED!",
      rule: "schedule.name",
    };
  },

  schemas: {
    schedule: scheduleSchema,
  },
};