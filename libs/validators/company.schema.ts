import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  mission: z.string().min(1, 'La misión es requerida'),
  vision: z.string().min(1, 'El visión es requerida'),
  objetives: z.string().min(1, 'Los objetivos son requeridos'),
  description: z.string().min(1, 'La descripción es requerida'),
});

export type CompanySchema = z.infer<typeof companySchema>;
