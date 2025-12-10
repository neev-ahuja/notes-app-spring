# Notes App (Spring Boot + Vite)

A full-stack notes application built with Spring Boot (Backend) and Vite (Frontend), featuring JWT authentication and PostgreSQL database integration.

## Tech Stack

### Backend
- **Java**: 25
- **Framework**: Spring Boot
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT (JSON Web Tokens)
- **Build Tool**: Maven

### Frontend
- **Build Tool**: Vite
- **Framework**: React (presumed based on common Vite usage)

## Prerequisites

- Java Development Kit (JDK) 25
- Node.js & npm
- PostgreSQL installed and running

## Getting Started

### 1. Database Setup

Create a PostgreSQL database for the application. You can name it `notes_db` (or updated the `application.properties` accordingly).

```sql
CREATE DATABASE notes_db;
```

### 2. Backend Configuration

Since `application.properties` is missing, you need to create it in `src/main/resources/application.properties`.

**Example `application.properties`:**

```properties
# Server Configuration
server.port=8080

# Database Configuration (PostgreSQL)
spring.datasource.url=jdbc:postgresql://localhost:5432/notes_db
spring.datasource.username=postgres
spring.datasource.password=your_postgres_password

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT Configuration (Replace with your own distinct values)
# Secret key should be at least 256-bit (32 characters)
security.jwt.secret-key=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
security.jwt.expiration-time=3600000
```

### 3. Run Backend

Navigate to the project root and run:

```bash
# Using Maven Wrapper
./mvnw spring-boot:run
```

The backend server should start on `http://localhost:8080`.

### 4. Run Frontend

Navigate to the `frontend` directory:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend should now be running (usually on `http://localhost:5173`).

## Features
- User Authentication (Login/Register)
- Create, Read, Update, Delete Notes
- Secure API endpoints using JWT
