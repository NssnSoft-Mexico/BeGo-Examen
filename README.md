# API de Gestión de Usuarios, Camiones, Órdenes y Ubicaciones

Esta API está diseñada para manejar la gestión de usuarios, camiones, órdenes de transporte y ubicaciones en un sistema de logística o transporte. Está construida utilizando **Node.js**, **MongoDB**, **TypeScript** y **JWT (JSON Web Tokens)** para la autenticación.

## Funcionalidades

### 1. **Usuarios**
- **Registro de Usuario**: Los usuarios pueden registrarse proporcionando su email y contraseña. El sistema verifica que no haya un usuario registrado con el mismo correo.
- **Autenticación de Usuario (Login)**: Los usuarios pueden iniciar sesión utilizando su correo y contraseña, recibiendo un token JWT para autenticar sus futuras solicitudes.
- **Autenticación basada en JWT**: El token JWT debe ser proporcionado en las solicitudes subsiguientes para validar la identidad del usuario.

### 2. **Camiones (Trucks)**
- **Creación de Camión**: Los usuarios pueden crear un camión proporcionando detalles como el año, color y placas del camión.
- **Listado de Camiones**: Los usuarios pueden listar todos los camiones asociados a su cuenta.
- **Actualización de Camión**: Los usuarios pueden actualizar la información de un camión específico.
- **Eliminación de Camión**: Los usuarios pueden eliminar un camión de su lista.

### 3. **Órdenes (Orders)**
- **Creación de Orden**: Los usuarios pueden crear una orden que asigna un camión a un trabajo de transporte, con un estatus (creada, en tránsito, completada) y ubicaciones de recogida y entrega.
- **Cambio de Estatus de Orden**: Los usuarios pueden cambiar el estatus de una orden (de `created` a `in transit`, o de `in transit` a `completed`).

### 4. **Ubicaciones (Locations)**
- **Creación de Ubicación**: Los usuarios pueden crear una ubicación utilizando un `place_id` de Google Maps, lo cual obtiene las coordenadas y la dirección de la ubicación.
- **Listar Ubicaciones**: Los usuarios pueden listar todas las ubicaciones que han creado.
- **Modificar y Eliminar Ubicaciones**: Los usuarios pueden actualizar o eliminar las ubicaciones que han creado.

## Desarrollo de la API

El desarrollo de la API fue abordado siguiendo una arquitectura de servicios RESTful con **Mongoose** como ODM (Object Data Modeling) para interactuar con MongoDB. A continuación, se explica la estructura y los pasos seguidos en el desarrollo:

### 1. **Estructura del Proyecto**
El proyecto está organizado de la siguiente manera:

### 2. **Uso de TypeScript**
El proyecto fue desarrollado utilizando **TypeScript** para garantizar la seguridad de tipos y facilitar la escalabilidad y el mantenimiento del código. Utilizamos las siguientes características:
- **Interfaces**: Definimos interfaces para cada entidad (como `IUser`, `ITruck`, `IOrder`, `ILocation`) para describir la estructura de los datos y los documentos de Mongoose.
- **Generics**: Empleamos tipos genéricos para asegurar la tipificación correcta de los esquemas de Mongoose y los modelos.
- **Middleware y Hooks de Mongoose**: Usamos middleware para la encriptación de contraseñas (usando bcrypt) y validaciones en la creación de documentos.
  
### 3. **Autenticación con JWT**
Para la seguridad, implementamos la autenticación basada en **JWT**. El flujo de autenticación es el siguiente:
- **Registro**: El usuario proporciona un email y una contraseña. La contraseña se cifra usando `bcryptjs` antes de ser almacenada.
- **Login**: El usuario puede iniciar sesión con su email y contraseña. Si la autenticación es exitosa, se devuelve un token JWT.
- **Autorización**: El token JWT debe ser incluido en las cabeceras de las solicitudes que requieren autorización. El middleware de autenticación valida el token y asegura que el usuario está autenticado.

### 4. **Validación de Datos**
Se utilizaron varias validaciones:
- **Validación de entradas**: Aseguramos que los datos de las solicitudes sean válidos antes de proceder, utilizando herramientas como `express-validator` o validación personalizada dentro de los controladores.
- **Validación de tokens JWT**: Antes de permitir el acceso a las rutas protegidas, validamos el JWT usando un middleware que verifica la firma del token.

### 5. **Manejo de Errores**
Implementamos un manejo de errores robusto que asegura una respuesta coherente para cada tipo de error:
- **Errores de validación**: Se retorna un mensaje claro cuando los datos proporcionados por el usuario no son válidos.
- **Errores de autenticación**: Si el token JWT no es válido o falta, se retorna un error de autorización.
- **Errores del servidor**: Cualquier error inesperado se captura y se devuelve con un mensaje genérico.

## Instalación

### Requisitos previos
1. **Node.js**: Asegúrate de tener instalada una versión reciente de Node.js (recomendado: v14.x o superior).
2. **MongoDB**: Se requiere una base de datos MongoDB en funcionamiento. Si no tienes una, puedes usar MongoDB Atlas para crear una base de datos en la nube.

### Instrucciones de instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/NssnSoft-Mexico/BeGo-Examen.git
   cd tu_repositorio

### EndPoints Disponibles

    POST /users/register: Registro de usuario.
    POST /users/login: Inicio de sesión de usuario.
    GET /trucks: Listar todos los camiones del usuario autenticado.
    POST /trucks: Crear un nuevo camión.
    PUT /trucks/:id: Actualizar un camión existente.
    DELETE /trucks/:id: Eliminar un camión.
    POST /orders: Crear una nueva orden.
    PATCH /orders/:id/status: Cambiar el estatus de una orden.
    POST /locations: Crear una ubicación usando un place_id.
    GET /locations: Listar todas las ubicaciones del usuario autenticado.
    PUT /locations/:id: Modificar una ubicación existente.
    DELETE /locations/:id: Eliminar una ubicación.