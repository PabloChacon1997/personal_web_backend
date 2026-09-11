import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi"
import { registry } from "./opneapi-registry"


export const generateOpenApiDocument = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'API - Web Personal',
      version: '1.0.0',
      description: 'Documentación de la API del backend de mi web personal'
    },
    servers: [{ url: '/api' }],
  });
}