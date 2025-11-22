package com.todo.controller;

import com.todo.dto.CreateTodoRequest;
import com.todo.dto.TodoDTO;
import com.todo.dto.UpdateTodoRequest;
import com.todo.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todolists/{listId}/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<TodoDTO> createTodo(
            @PathVariable Long listId,
            @RequestBody CreateTodoRequest request) {
        TodoDTO created = todoService.createTodo(listId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<TodoDTO> updateTodo(
            @PathVariable Long listId,
            @PathVariable Long todoId,
            @RequestBody UpdateTodoRequest request) {
        TodoDTO updated = todoService.updateTodo(listId, todoId, request);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{todoId}/toggle")
    public ResponseEntity<TodoDTO> toggleTodo(
            @PathVariable Long listId,
            @PathVariable Long todoId) {
        TodoDTO toggled = todoService.toggleTodo(listId, todoId);
        return ResponseEntity.ok(toggled);
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> deleteTodo(
            @PathVariable Long listId,
            @PathVariable Long todoId) {
        todoService.deleteTodo(listId, todoId);
        return ResponseEntity.noContent().build();
    }
}
