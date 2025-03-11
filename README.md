# Task Management System

This is a **Task Management System** built with **Angular** (frontend) and **.NET Core** (backend). The application allows users to create, update, delete, and view tasks. It uses **NgRx** for state management on the frontend and **microservices** on the backend.

---

## Features

### Frontend (Angular + NgRx)
- **Task Management**:
  - Create, update, delete, and view tasks.
  - Filter tasks by status (completed or pending).
  - Sort tasks by title.
- **State Management**:
  - Uses NgRx for managing application state.
- **User Interface**:
  - Modern and responsive UI built with **Bootstrap**.

### Backend (.NET Core)
- **Task Microservice**:
  - Handles CRUD operations for tasks.
- **User Microservice** (optional):
  - Manages user-related operations (if implemented).
- **API Documentation**:
  - Uses **Swagger** for API testing and documentation.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (for Angular)
- **.NET SDK** (for .NET Core)
- **Angular CLI** (`npm install -g @angular/cli`)

---


#Setup Instructions

Backend (ASP.NET)
	1.	Navigate to the backend/TaskService folder:

      cd backend/TaskService

2.	Restore dependencies:

        dotnet restore

3.	Run the application:

          dotnet run


Frontend (Angular)
	1.	Navigate to the frontend/TaskManagementApp folder:

    cd frontend/TaskManagementApp


2.	Install dependencies:

        npm install


3.	Run the application:

        ng serve



