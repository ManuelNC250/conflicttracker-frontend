# Gestión de Clientes - Aplicación Fullstack

## 🌐 URLs de Producción

- **Frontend (Vue 3)**: [https://conflicttracker-frontend-three.vercel.app/]([url](https://conflicttracker-frontend-three.vercel.app/))
- **Backend (Spring Boot)**: [https://conflicttracker-production-8ab6.up.railway.app]([url](https://conflicttracker-production-8ab6.up.railway.app))
- **Base de Datos**: PostgreSQL en Supabase

## 🏗️ Arquitectura

- **Frontend**: Vue 3 + Vite desplegado en Vercel
- **Backend**: Spring Boot 3 + Java 17 desplegado en Railway
- **Base de Datos**: PostgreSQL 15 en Supabase

## 📋 Modificaciones Realizadas

#### 1. Configuración de Base de Datos
**Problema**: La aplicación intentaba conectarse a `localhost:5432`
**Solución**: Modificar `application.yml` para usar variables de entorno:
```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
```

#### 2. Configuración CORS
**Problema**: Errores CORS al hacer peticiones desde Vercel
**Solución**: Crear `WebConfig.java` con configuración CORS dinámica usando `FRONTEND_URL`

### Frontend (Vue)

#### 1. Variables de Entorno
**Problema**: URLs hardcodeadas a `localhost:8080`
**Solución**: Usar `import.meta.env.VITE_API_URL` y crear archivos `.env.production`

#### 2. SPA Routing
**Problema**: Error 404 al refrescar rutas en Vercel
**Solución**: Crear `vercel.json` con rewrites para redirigir todo a `index.html`

## 🚀 Cómo Replicar el Despliegue

1. Crear proyecto en Supabase y obtener credenciales
2. Configurar variables en Railway y desplegar desde GitHub
3. Configurar variables en Vercel y desplegar desde GitHub
4. Actualizar `FRONTEND_URL` en Railway con la URL final de Vercel
