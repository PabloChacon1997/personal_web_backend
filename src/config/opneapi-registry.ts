import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { loginResponseSchema, loginSchema, refreshResponseSchema, refreshSchema, registerResponseSchema, registerSchema } from "../schemas/auth.schema";
import { createUserSchema, idQuerySchema, listUsersQuerySchema, meResponseSchema, responseErrorSchema, responseSchema, updateUserSchema } from '../schemas/user.schema';
import { createMenuResponseSchema, createMenuSchema } from "../schemas/menu.schema";


export const registry = new OpenAPIRegistry();

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT'
});

registry.registerPath({
  method: 'post',
  path: '/auth/register',
  tags: ['Auth'],
  summary: "Registrar nuevo usuario",
  request: {
    body: {
      content: { 'application/json': { schema: registerSchema } }
    },
  },
  responses: {
    201: {
      description: "Usuario Creado exitosamente",
      content: { 'application/json': { schema: registerResponseSchema } }
    },
    400: { description: 'Datos inválidos' },
    409: { description: 'Ya existe una cuenta con este email' },
  }
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  summary: "Inicio de Sesión",
  request: {
    body: {
      content: { 'application/json': { schema: loginSchema } }
    },
  },
  responses: {
    200: {
      description: "Inicio de sesión exitoso",
      content: { 'application/json': { schema: loginResponseSchema } }
    },
    400: { description: 'Credenciales incorrectas' },
    401: { description: 'Usuario no activado' },
  }
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  summary: "Inicio de Sesión",
  request: {
    body: {
      content: { 'application/json': { schema: loginSchema } }
    },
  },
  responses: {
    200: {
      description: "Inicio de sesión exitoso",
      content: { 'application/json': { schema: loginResponseSchema } }
    },
    400: { description: 'Credenciales incorrectas' },
    401: { description: 'Usuario no activado' },
  }
});

registry.registerPath({
  method: 'post',
  path: '/auth/refresh-token',
  tags: ['Auth'],
  summary: "Refrescar el token",
  request: {
    body: {
      content: { 'application/json': { schema: refreshSchema } }
    },
  },
  responses: {
    200: {
      description: "Regresa el token",
      content: { 'application/json': { schema: refreshResponseSchema } }
    },
    401: { description: 'Refresh Token Inválido' },
    500: { description: 'Error en el servidor' },
  }
});

registry.registerPath({
  method: 'get',
  path: '/user/me',
  tags: ['User'],
  summary: "Obtener el usuario autenticado",
  security: [{ bearerAuth: [] }],
  request: {},
  responses: {
    200: {
      description: "Usuario autenticado",
      content: { 'application/json': { schema: meResponseSchema } }
    },
    401: { description: 'Token Inválido' },
  }
});

registry.registerPath({
  method: 'get',
  path: '/user/users',
  tags: ['User'],
  summary: "Lista de usuarios",
  security: [{ bearerAuth: [] }],
  request: {
    query: listUsersQuerySchema
  },
  responses: {
    200: {
      description: "Usuario autenticado",
      content: { 'application/json': { schema: meResponseSchema } }
    },
    401: { description: 'Token Inválido' },
  }
});

registry.registerPath({
  method: 'post',
  path: '/user/user',
  tags: ['User'],
  summary: "Crear un usuario",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'multipart/form-data': { schema: createUserSchema } },
    },
  },
  responses: {
    201: {
      description: "Usuario creado correctamete",
      content: { 'text/plain': { schema: responseSchema } }
    },
    401: { description: 'Token Inválido' },
    409: { description: 'Ya existe un usuario con este email' },
  }
});

registry.registerPath({
  method: 'put',
  path: '/user/user/:id',
  tags: ['User'],
  summary: "Editar un usuario",
  security: [{ bearerAuth: [] }],
  request: {
    params: idQuerySchema,
    body: {
      content: { 'multipart/form-data': { schema: updateUserSchema } },
    },
  },
  responses: {
    200: {
      description: "Usuario actualizado correctamete",
      content: { 'text/plain': { schema: responseSchema } }
    },
    401: { description: 'Token Inválido' },
    404: { description: 'No existe el usuario' },
  }
});

registry.registerPath({
  method: 'delete',
  path: '/user/user/:id',
  tags: ['User'],
  summary: "Eliminar un usuario",
  security: [{ bearerAuth: [] }],
  request: {
    params: idQuerySchema
  },
  responses: {
    200: {
      description: "Usuario eliminado correctamete",
      content: { 'text/plain': { schema: responseSchema } }
    },
    400: { 
      description: 'Error en la petición',
      content: { 'application/json': { schema: responseErrorSchema } }
    },
    401: { description: 'Token Inválido' },
    404: { description: 'No existe el usuario' },
  }
});

registry.registerPath({
  method: 'post',
  path: '/menu/menu',
  tags: ['Menu'],
  summary: "Crear un menu",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: createMenuSchema } }
    },
  },
  responses: {
    201: {
      description: "Menu creado correctamete",
      content: { 'application/json': { schema: createMenuResponseSchema } }
    },
    400: { 
      description: 'Datos incorrectos',
      content: { 'application/json': { schema: responseErrorSchema } }
    },
    401: { description: 'Token Inválido' },
  }
});