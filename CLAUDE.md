# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack todo list application with:
- **UI**: React frontend using Material-UI components, React Router for navigation
- **API**: Spring Boot 3.2 backend with JPA/Hibernate for database access
- **Database**: MySQL 8.0 (runs in Docker via docker-compose)

## Development Setup

### Start MySQL Database
```bash
docker-compose up -d
```

### Run the Backend API
```bash
cd api
mvn spring-boot:run
```
API runs on http://localhost:8080

### Run the Frontend UI
```bash
cd ui
npm install  # First time only
npm start
```
UI runs on http://localhost:3000

### Run Tests
```bash
# UI tests
cd ui
npm test

# API tests
cd api
mvn test
```

### Build for Production
```bash
# UI build
cd ui
npm run build

# API build
cd api
mvn clean package
```

## Architecture

### Backend (Spring Boot)
The API follows a standard layered architecture:

- **Controllers** (`com.todo.controller`): REST endpoints with CORS enabled
  - `TodoListController`: Manages todo lists at `/api/todolists`
  - `TodoController`: Manages individual todos at `/api/todolists/{listId}/todos`

- **Services** (`com.todo.service`): Business logic layer
  - `TodoListService`: Operations on TodoLists
  - `TodoService`: Operations on individual Todos

- **Repositories** (`com.todo.repository`): JPA repositories for database access
  - `TodoListRepository`: JpaRepository<TodoList, Long>
  - `TodoRepository`: JpaRepository<Todo, Long>

- **Models** (`com.todo.model`): JPA entities
  - `TodoList`: Parent entity with one-to-many relationship to Todos
  - `Todo`: Child entity with many-to-one relationship to TodoList

- **DTOs** (`com.todo.dto`): Data transfer objects for API requests/responses
  - Request DTOs: CreateTodoListRequest, UpdateTodoListRequest, CreateTodoRequest, UpdateTodoRequest
  - Response DTOs: TodoListSummaryDTO (for list views), TodoListDetailDTO (includes todos), TodoDTO

- **Config** (`com.todo.config`):
  - `DataInitializer`: Creates sample data on startup

**Key relationships**: TodoList has cascade operations and orphan removal enabled for its Todos. Deleting a TodoList will cascade delete all associated Todos.

### Frontend (React)
The UI is organized by feature:

- **Pages** (`src/pages/`):
  - `HomePage`: Displays all todo lists (grid of TodoListCard components)
  - `TodoDetailPage`: Shows individual todo list with all todos

- **Components** (`src/components/`):
  - `TodoListCard`: Card display for a todo list with title, counts, delete button
  - `TodoItem`: Individual todo with checkbox, editable text, delete button
  - `EditableText`: Reusable component for inline text editing

- **Services** (`src/services/`):
  - `todoService.js`: Axios-based API client for all backend communication

**Routing**: Uses React Router v7 with two routes:
- `/` - Home page with all lists
- `/list/:id` - Detail page for specific list

**State management**: Uses React hooks (useState, useEffect) with local component state. API calls in useEffect hooks refresh data after mutations.

## Database Configuration

Connection details are in `api/src/main/resources/application.properties`:
- URL: jdbc:mysql://localhost:3306/tododb
- User: todouser
- Password: todopassword
- DDL: Hibernate auto-update mode (creates/updates schema automatically)

Database credentials match the docker-compose.yml configuration.

## API Endpoints

### TodoList Management
- `GET /api/todolists` - List all todo lists (returns summaries)
- `GET /api/todolists/{id}` - Get specific todo list (returns detail with todos)
- `POST /api/todolists` - Create new todo list (body: `{title: string}`)
- `PUT /api/todolists/{id}` - Update todo list title (body: `{title: string}`)
- `DELETE /api/todolists/{id}` - Delete todo list and all its todos

### Todo Management (nested under lists)
- `POST /api/todolists/{listId}/todos` - Create todo (body: `{text: string}`)
- `PUT /api/todolists/{listId}/todos/{todoId}` - Update todo (body: `{text: string, completed: boolean}`)
- `PATCH /api/todolists/{listId}/todos/{todoId}/toggle` - Toggle completion status
- `DELETE /api/todolists/{listId}/todos/{todoId}` - Delete todo

All endpoints have CORS enabled for `*` origins.
