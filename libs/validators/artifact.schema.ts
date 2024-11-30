import { z } from 'zod';

export const artifactSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido.' }),
  description: z.string().min(3, { message: 'La descripción es requerida.' }),
  yearProjection: z.number().int(),
  type: z.string().min(3, { message: 'El tipo de flujo es requerido.' }),
  data: z.string().min(3, { message: 'Los datos del flujo son requeridos' }),
});

export type ArtifactSchema = z.infer<typeof artifactSchema>;
