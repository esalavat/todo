package com.todo.controller;

import com.todo.dto.CreateTodoListRequest;
import com.todo.dto.TodoListDetailDTO;
import com.todo.dto.TodoListSummaryDTO;
import com.todo.dto.UpdateTodoListRequest;
import com.todo.service.TodoListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todolists")
@CrossOrigin(origins = "*")
public class TodoListController {

    private final TodoListService todoListService;

    public TodoListController(TodoListService todoListService) {
        this.todoListService = todoListService;
    }

    @GetMapping
    public ResponseEntity<List<TodoListSummaryDTO>> getAllTodoLists() {
        List<TodoListSummaryDTO> todoLists = todoListService.getAllTodoLists();
        return ResponseEntity.ok(todoLists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoListDetailDTO> getTodoListById(@PathVariable Long id) {
        TodoListDetailDTO todoList = todoListService.getTodoListById(id);
        return ResponseEntity.ok(todoList);
    }

    @PostMapping
    public ResponseEntity<TodoListDetailDTO> createTodoList(@RequestBody CreateTodoListRequest request) {
        TodoListDetailDTO created = todoListService.createTodoList(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoListSummaryDTO> updateTodoList(
            @PathVariable Long id,
            @RequestBody UpdateTodoListRequest request) {
        TodoListSummaryDTO updated = todoListService.updateTodoList(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodoList(@PathVariable Long id) {
        todoListService.deleteTodoList(id);
        return ResponseEntity.noContent().build();
    }
}
