import { isoToCron } from "@/utils/helpers";
import { ndSheduler } from "@/utils/shared";

type schedulePayload = {
  timestamp: string;
  interval: 'infinite' | number; //infinite or time in millisec
}

export const schedulerService = {
  async schedule(payload: schedulePayload) {
    const timestampInCronQuery = isoToCron(payload.timestamp);
    const scheduled = ndSheduler.scheduleJob(timestampInCronQuery, () => {
      console.log("FUNNY JOB EXECUTED!=> ");
    });
    return {
      message: "JOB SCHEDULED!",
      scheduled
    }
  },
};
