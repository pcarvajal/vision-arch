import { z } from 'zod';

export const validateEmail = z
  .string()
  .min(1, { message: 'El email es requerido.' })
  .email({ message: 'El email es inválido.' });

export const validatePassword = z
  .string()
  .min(1, { message: 'La contraseña es requerida.' })
  .min(8, { message: 'La contraseña tiene que tener 8 caractéres como mínimo.' })
  .regex(new RegExp('.*[A-Z].*'), {
    message: 'La contraseña tiene que tener al menos una letra mayúscula.',
  })
  .regex(new RegExp('.*[a-z].*'), {
    message: 'La contraseña tiene que tener al menos una letra minúscula.',
  })
  .regex(new RegExp('.*\\d.*'), {
    message: 'La contraseña tiene que tener al menos un número.',
  });
