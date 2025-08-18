import z from "zod";


const rangeSchema = z.object({
  start: z.number(),
  end: z.number(),
  step: z.number().optional(), // Step is optional in Range
})
const reoccurence = z.union([rangeSchema, z.number(), z.string()])

const ruleSchema = z.object({
  recurs: z.boolean(),
  year: reoccurence.nullable(),
  month: reoccurence.nullable(),
  date: reoccurence.nullable(),
  dayOfWeek: reoccurence.nullable().or(z.array(z.number())),
  hour: reoccurence.nullable(),
  minute: reoccurence.nullable(),
  second: reoccurence.nullable(),
});

// Zod schema for validation
export const scheduleSchema = z.object({
  rule: ruleSchema.or(z.string()),
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