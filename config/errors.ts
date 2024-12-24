// Backend errors 10x
export const UNHANDLED_ERROR = {
  code: -100,
  message: 'Ha ocurrido un error inesperado.',
  type: 'error' as const,
};

export const RESOURCE_NOT_FOUND_ERROR = {
  code: 100,
  message: 'No se encontró el recurso.',
  type: 'error' as const,
};

export const USER_EXISTS_ERROR = {
  code: 101,
  message: 'El usuario ya existe.',
  type: 'error' as const,
};

export const USER_NOT_TEAM_ERROR = {
  code: 102,
  message: 'El usuario no pertenece a ningún equipo.',
  type: 'error' as const,
};

export const CREATE_RESOURCE_ERROR = {
  code: 103,
  message: 'Error al crear el recurso.',
  type: 'error' as const,
};

export const UPDATE_RESOURCE_ERROR = {
  code: 104,
  message: 'Error al actualizar el recurso.',
  type: 'error' as const,
};

export const CREATE_AI_MODEL_ERROR = {
  code: 105,
  message: 'Error al crear el modelo de IA.',
  type: 'error' as const,
};
