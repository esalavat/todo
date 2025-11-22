# Todo List App

A simple and efficient todo list application to help you organize and manage your tasks.

## Description

This application allows users to create, track, and manage their daily tasks and to-do items. Stay organized and productive by keeping all your tasks in one place.

## Project Structure

- `ui/` - React frontend application
- `api/` - Spring Boot backend API

## Prerequisites

### UI (React)
- Node.js (v14 or higher)
- npm (v6 or higher)

### API (Spring Boot)
- Java 17 or higher
- Maven 3.6 or higher

## Running the Application

### Running the UI

1. Navigate to the UI directory:
   ```bash
   cd ui
   ```

2. Install dependencies (first time only):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser to [http://localhost:3000](http://localhost:3000)

### Running the API

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

3. The API will be available at [http://localhost:8080](http://localhost:8080)

4. Test the hello endpoint:
   ```bash
   curl http://localhost:8080/hello
   ```
