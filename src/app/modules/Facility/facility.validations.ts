import { z } from 'zod';

// validation for creating
export const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }),
    description: z
      .string()
      .trim()
      .min(1, { message: 'Description is required' }),
    pricePerHour: z
      .number()
      .min(0, { message: 'Price per hour must be a positive number' }),
    location: z.string().trim().min(1, { message: 'Location is required' }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

// validation for updating
export const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1).optional(),
    pricePerHour: z.number().min(0).optional(),
    location: z.string().trim().min(1).optional(),
    isDeleted: z.boolean().optional().default(false).optional(),
  }),
});

export const FacilityValidation = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
