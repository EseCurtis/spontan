import z from "zod";


const ruleSchema = z.object({
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
});

// Zod schema for validation
export const scheduleSchema = z.object({
  rule: z.union([ruleSchema, z.string()]),
  request: z.object({
    method: z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']),
    url: z.string().url(), // Enforce valid URL format
    data: z.unknown().optional(),
    headers: z.record(z.string(), z.string()).optional(),
  }),
  callbackUrl: z.string().url().optional(), // Enforce valid URL if provided
});

export const cancelScheduleSchema = z.object({
  job_name_or_persistUuid: z.string().optional(),
});