# CRUD de Usuarios con React y Spring Boot + JWT

Aplicación full-stack que permite a un usuario autenticado realizar operaciones CRUD sobre una lista de usuarios. El **frontend** está desarrollado en React y el **backend** es una API REST con Spring Boot protegida mediante JWT.

---

## Características

- Autenticación segura con **JWT**
- Visualización, creación, edición y eliminación de usuarios
- API REST protegida con **Spring Security**
- Persistencia de datos con **MySQL** vía JPA/Hibernate
- Estilos con **Bootstrap 5**
- Protección de rutas privadas en el frontend

---

## Tecnologías utilizadas

### Frontend

- **React** 19
- **React Router DOM**
- **Bootstrap 5**
- **Axios** para consumir la API REST
- **JWT** para autenticación segura

### Backend

- **Java** 21
- **Spring Boot** 3.5.3
- **Spring Security** + **JWT** (jjwt 0.11.5)
- **Spring Data JPA** / **Hibernate**
- **MySQL**
- **Lombok**

---

## Estructura del proyecto

```Estructura
authorify/
│
├── frontend/
│   ├── public/
│   │   └── (imágenes/gifs)
│   └── src/
│       ├── api/           # Funciones para llamadas a la API
│       ├── components/    # Componentes reutilizables
│       ├── context/       # Contexto global para autenticación
│       ├── pages/         # Páginas del sitio
│       ├── App.jsx
│       └── main.jsx
│
└── backend/
    └── src/main/java/net/ddns/deveps/authenticator/
        ├── controllers/   # Endpoints REST
        ├── dto/           # Objetos de transferencia de datos
        ├── entities/      # Entidades JPA
        ├── repositories/  # Acceso a base de datos
        ├── security/      # Filtro JWT y configuración de seguridad
        └── services/      # Lógica de negocio
```

---

## Instalación y ejecución

### Requisitos previos

- Node.js >= 18
- Java 21
- Maven
- MySQL

### Clonar el repositorio

```bash
git clone https://github.com/devepsdev/authorify.git
cd authorify
```

---

#### Configurar la base de datos

Crea la base de datos en MySQL:

```sql
CREATE DATABASE contactos_db;
```

Crea un archivo `application.properties` en `backend/src/main/resources/` (o edita el existente) con tus credenciales:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/contactos_db
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

#### Ejecutar el backend

```bash
cd backend
./mvnw spring-boot:run
```

La API estará disponible en `http://localhost:8080`

---

#### Configurar variables de entorno

Crea un archivo `.env` en `frontend/`:

```env
VITE_API_URL=http://localhost:8080/api
```

#### Instalar dependencias y ejecutar

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## Captura de pantalla

![Captura del CRUD](frontend/public/animation.gif)

---

## 👨‍💻 Autor

**deveps** - _Desarrollo Full Stack_

- GitHub: [@devepsdev](https://github.com/devepsdev)
- Portfolio: [deveps.ddns.net](https://deveps.ddns.net)

## 🔗 Enlaces Relacionados

- [Live Demo](https://deveps.ddns.net/authentify)

## 📞 Contacto

Enrique — [@devepsdev](https://x.com/devepsdev) — <devepsdev@gmail.com>

---

⭐ ¡Dale una estrella a este proyecto si te ha gustado!

💡 ¿Tienes ideas para mejorar? ¡Abre un issue o contribuye con código!
