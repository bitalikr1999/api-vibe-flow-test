# VibeFlow

## Getting Started

To start the project, follow these steps:

1. Start Docker:
  ```docker-compose up -d```

2. Run the start script:
   ```./start.sh```.

  This script will run the migrations, seed the database, and start the project.


## Project Structure
The project is organized into several key directories:

```
src/  
├── domain/             # Contains domain-specific logic  
│   ├── songs/         # Song-related domain logic  
│   ├── users/         # User-related domain logic  
│  
├── features/           # Contains feature-specific modules and services (business logic)  
│   ├── auth/          # Authentication-related features  
│   ├── songs/         # Song-related features  
│  
├── infra/              # Contains infrastructure-related code  
│   ├── config/        # Configuration files  
│   ├── database/      # Database-related code  
│  
├── shared/             # Contains shared utilities and services  
```  

## Authorization

For authorization, a simplified version of JWT (JSON Web Token) is used. This allows for secure authentication and authorization of users within the application.


## Database 

PostgreSQL is used as the database for this project. It is a powerful, open-source object-relational database system that provides robust data integrity and supports advanced data types and performance optimization features.

## ORM

Prisma is used as the ORM (Object-Relational Mapping) tool for this project. It provides a type-safe database client and a powerful migration system.
