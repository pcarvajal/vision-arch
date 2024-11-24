import { z } from 'zod';

import { validateEmail, validatePassword } from '@/libs/validators/common-rules';

export const loginSchema = z.object({
  email: validateEmail,
  password: validatePassword,
});

export type LoginSchema = z.infer<typeof loginSchema>;
