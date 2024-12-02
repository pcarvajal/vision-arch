import { z } from 'zod';

export const artifactSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido.' }),
  description: z.string().min(3, { message: 'La descripción es requerida.' }),
});

export type ArtifactSchema = z.infer<typeof artifactSchema>;
