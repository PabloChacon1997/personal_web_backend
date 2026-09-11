import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { loginResponseSchema, loginSchema, refreshResponseSchema, refreshSchema, registerResponseSchema, registerSchema } from "../schemas/auth.schema";


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
  path: '/auth//refresh-token',
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