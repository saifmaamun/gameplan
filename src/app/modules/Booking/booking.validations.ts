import { z } from 'zod';

export const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format. Expected 'YYYY-MM-DD'.",
    }),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: "Invalid time format. Expected 'HH:MM'.",
    }),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, {
      message: "Invalid time format. Expected 'HH:MM'.",
    }),
    facility: z.string({
      invalid_type_error: 'Facility must be string',
      required_error: 'Facility ID is required.',
    }),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
