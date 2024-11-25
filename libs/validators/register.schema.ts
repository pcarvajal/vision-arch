import { z } from 'zod';

import { validateEmail, validatePassword } from './common-rules';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'El nombre es requerido.' })
      .max(300, { message: 'El nombre es muy largo.' }),
    email: validateEmail,
    companyName: z
      .string()
      .min(1, { message: 'El nombre es requerido.' })
      .max(300, { message: 'El nombre es muy largo.' }),
    password: validatePassword,
    confirmPassword: validatePassword,
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden.',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
