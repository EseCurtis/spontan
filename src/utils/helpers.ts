import { ZodSchema } from 'zod';

export function isoToCron(isoString: string): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid ISO date string');
  }

  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based in JS
  const dayOfWeek = date.getDay();

  // Include second only if it's not 0
  return second === 0
    ? `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
    : `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}




interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: { path: string; message: string }[];
}

export function zodValidate<T>(payload: unknown, schema: ZodSchema<T>): ValidationResult<T> {
  const result = schema.safeParse(payload);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  return {
    success: false,
    errors: result.error.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  };
}