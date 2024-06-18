# Curso de Node.js

Node.js es un entorno de ejecución para JavaScript construido sobre el motor V8 de Google Chrome. Se utiliza principalmente para crear aplicaciones del lado del servidor, lo que permite a los desarrolladores escribir el código del servidor utilizando JavaScript, el mismo lenguaje que se usa en el lado del cliente (navegador).

#

### Características Principales de Node.js

1. `Asincronía y Orientado a Eventos`: Node.js está diseñado para manejar múltiples operaciones al mismo tiempo sin bloquear la ejecución del código. Esto se logra mediante un modelo de entrada/salida no bloqueante, lo que permite que las operaciones como las solicitudes a la base de datos o la lectura/escritura de archivos se realicen en paralelo.

2. `V8 JavaScript Engine`: Utiliza el motor V8 de Google Chrome, que compila JavaScript directamente en código máquina, lo que lo hace muy rápido.

3. `Single Threaded`: Node.js opera en un solo hilo utilizando el modelo de bucle de eventos. Aunque esto pueda parecer una limitación, en realidad es una ventaja para manejar muchas conexiones concurrentes de manera eficiente sin la sobrecarga de la gestión de múltiples hilos.

4. `NPM (Node Package Manager)`: Es el gestor de paquetes integrado en Node.js que permite a los desarrolladores instalar y gestionar fácilmente dependencias (librerías y módulos) para sus aplicaciones.

5. `Gran Comunidad y Ecosistema`: Node.js tiene una comunidad activa y un amplio ecosistema de módulos y herramientas que facilitan el desarrollo de aplicaciones robustas y escalables.

### Usos comunes en Node.js

- Aplicaciones Web: Construncción de servidores y de aplclicaciones web escalables.

- APIs RESTful: Creación de APIs para la comunicación entre el cliente y el servidor.

- Aplicaciones en Tiempo Real: Ideal para aplicaciones que requieren interacción en tiempo real, como chats y juegos online.

- Servicios de Microservicios: Implementación de arquitectura de microservicios debido a su naturaleza ligera y modular.

### Ejemplo de Código Básico en Node.js

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, World!\n')
})

const port = 3000
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
```

### REST

REST (_Representational State Transfer_) es un estilo de arquitectura para diseñar servicios web. Fue introducido por **Roy Fielding** en su disertación doctoral en el año 2000. REST se basa en un conjunto de principios que definen cómo los recursos en la web deben ser identificados y gestionados utilizando HTTP.

`Principios Clave de REST`

1. Recursos: Los recursos (datos o servicios) se identifican mediante URLs.
2. Operaciones HTTP: Los métodos HTTP (GET, POST, PUT, DELETE) se utilizan para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los recursos.
3. Representaciones: Los recursos pueden tener múltiples representaciones (por ejemplo, JSON, XML).
4. Sin Estado (Stateless): Cada solicitud del cliente al servidor debe contener toda la información necesaria para entender y procesar la solicitud. El servidor no debe almacenar el estado del cliente entre solicitudes.
5. Interfaz Uniforme: La interfaz debe ser uniforme y estandarizada, lo que facilita la interacción entre los distintos componentes del sistema.

`API`

API (Application Programming Interface) es un conjunto de definiciones y protocolos para construir e integrar aplicaciones de software. Una API permite que dos aplicaciones se comuniquen entre sí. Las APIs definen la forma en que los desarrolladores pueden interactuar con una aplicación, servicio o módulo de software.

`RESTful API`

Cuando una API se diseña siguiendo los principios de REST, se le llama RESTful API. Estas APIs se utilizan para permitir la comunicación entre un cliente (por ejemplo, una aplicación web o móvil) y un servidor a través de la web utilizando HTTP.

`Ejemplo de Operaciones en una RESTful API`:

1. GET: Obtener un recurso o una lista de recursos.
2. POST: Crear un nuevo recurso.
3. PUT: Actualizar un recurso existente.
4. DELETE: Eliminar un recurso.

`Ejemplo de Endpoints en una RESTful API`:

1. GET /users: Obtener una lista de usuarios.
2. GET /users/1: Obtener detalles del usuario con ID 1.
3. POST /users: Crear un nuevo usuario.
4. PUT /users/1: Actualizar el usuario con ID 1.
5. DELETE /users/1: Eliminar el usuario con ID 1.

RESTful APIs son ampliamente utilizadas debido a su simplicidad y escalabilidad, lo que las hace ideales para aplicaciones web modernas y servicios distribuidos.
