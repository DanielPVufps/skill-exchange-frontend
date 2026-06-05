# Skill Exchange Frontend

Frontend desarrollado con Next.js para consumir la API REST de Skills Exchange.

Este proyecto implementa autenticación JWT, catálogo de habilidades, sistema de metas de aprendizaje, navegación responsive y consumo de datos reales desde una API desarrollada con Django REST Framework.

---

# Tecnologías utilizadas

- Next.js
- React
- JavaScript
- Axios
- JWT Authentication
- Tailwind CSS
- Lucide React Icons

---

# Objetivo del proyecto

Construir una aplicación frontend que consuma una API REST real permitiendo:

- Autenticación mediante JWT
- Visualización de habilidades
- Filtrado y búsqueda
- Visualización detallada de habilidades
- Gestión de metas de aprendizaje
- Navegación responsive
- Protección de rutas

---

# API utilizada

Backend desplegado:

https://apiskills.danidev.co/api/

Swagger:

https://apiskills.danidev.co/api/docs/

---

# Instalación

Clonar repositorio:

```bash
git clone TU_REPOSITORIO
```

Entrar al proyecto:

```bash
cd skill-exchange-frontend
```

Instalar dependencias:

```bash
npm install
```

Crear archivo:

```text
.env.local
```

Agregar:

```env
NEXT_PUBLIC_API_BASE_URL=https://apiskills.danidev.co/api
```

Ejecutar:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

---

# Credenciales

Las credenciales utilizadas corresponden a las mismas credenciales institucionales utilizadas para consumir el API.

La autenticación utiliza:

- Access Token
- Refresh Token
- LocalStorage

---

# Funcionalidades implementadas

## Landing Page

- Presentación visual de la plataforma
- Botones de navegación
- Responsive

---

## Login JWT

- Inicio de sesión
- Obtención de Access Token
- Almacenamiento de tokens
- Protección de rutas

---

## Dashboard

- Vista principal
- Navegación protegida
- Información del usuario autenticado

---

## Skills

Implementa:

- Listado de habilidades
- Cards visuales
- Categorías
- Filtros
- Búsqueda
- Ordenamiento
- Paginación
- Responsive

Funciones soportadas:

- Buscar skill
- Filtrar por categoría
- Ordenar A-Z
- Navegar páginas

---

## Detalle de Skill

Cada habilidad posee:

- Nombre
- Categoría
- Nivel
- Fecha
- Información detallada

---

## Usuarios

Implementa:

- Consulta del usuario autenticado
- Información del perfil
- Datos personales

---

## Metas de Aprendizaje

Incluye:

- Barra de progreso
- Estado de avance
- Botón alcanzar meta
- Progreso porcentual

---

## Responsive Design

Implementado:

- Navbar responsive
- Menú hamburguesa
- Mobile navigation
- Layout adaptable

---

# Componentes reutilizables

El proyecto fue dividido en componentes reutilizables para evitar duplicación.

Ejemplos:

- Navbar
- Pagination
- SkillCard
- CategoryFilter
- OrderSelector
- LoadingState
- ErrorState
- EmptyState

---

# Arquitectura utilizada

Estructura principal:

```text
src/

app/

(auth)/

login/

(dashboard)/

dashboard/

skills/

[id]/

profile/

goals/

components/

skills/

ui/

services/

lib/
```

---

# Organización del código

## app/

Contiene:

- páginas
- layouts
- navegación

## components/

Componentes reutilizables.

## services/

Servicios encargados de consumir el API.

## lib/

Configuración centralizada de Axios.

---

# Autenticación

Flujo:

```text
Login

↓

POST /api/token/

↓

Guardar access_token

↓

Enviar Authorization Bearer

↓

Consumir API protegida
```

---

# Endpoints utilizados

```text
POST /api/token/

GET /api/skills/

GET /api/skills/{id}

GET /api/users/me/

GET /api/goals/

POST /api/goals/{id}/achieve/
```

---

# Capturas requeridas

Crear carpetas:

```text
capturas/

app/

postman/
```

Agregar:

## Postman / Swagger

- token JWT
- skills
- detalle skill
- filtro
- paginación

## Aplicación

- landing page
- login
- dashboard
- skills
- detalle
- usuarios
- metas
- mobile menu

---

# Decisiones de arquitectura

Se decidió:

- Centralizar llamadas API mediante Axios
- Separar componentes reutilizables
- Mantener JWT en localStorage
- Implementar diseño responsive
- Utilizar paginación reutilizable

Esto facilita:

- mantenimiento
- reutilización
- escalabilidad

---

# Autor

Daniel Alejandro Pacheco Villamizar

Universidad Francisco de Paula Santander

Arquitectura / Desarrollo Web Frontend
