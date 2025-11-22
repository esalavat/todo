package com.todo.service;

import com.todo.dto.*;
import com.todo.model.Todo;
import com.todo.model.TodoList;
import com.todo.repository.TodoListRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TodoListService {

    private final TodoListRepository todoListRepository;

    public TodoListService(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    public List<TodoListSummaryDTO> getAllTodoLists() {
        return todoListRepository.findAll().stream()
                .map(this::toSummaryDTO)
                .collect(Collectors.toList());
    }

    public TodoListDetailDTO getTodoListById(Long id) {
        TodoList todoList = todoListRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TodoList not found with id: " + id));
        return toDetailDTO(todoList);
    }

    public TodoListDetailDTO createTodoList(CreateTodoListRequest request) {
        TodoList todoList = new TodoList(request.getTitle());
        TodoList saved = todoListRepository.save(todoList);
        return toDetailDTO(saved);
    }

    public TodoListSummaryDTO updateTodoList(Long id, UpdateTodoListRequest request) {
        TodoList todoList = todoListRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TodoList not found with id: " + id));
        todoList.setTitle(request.getTitle());
        TodoList updated = todoListRepository.save(todoList);
        return toSummaryDTO(updated);
    }

    public void deleteTodoList(Long id) {
        todoListRepository.deleteById(id);
    }

    private TodoListSummaryDTO toSummaryDTO(TodoList todoList) {
        return new TodoListSummaryDTO(
                todoList.getId(),
                todoList.getTitle(),
                todoList.getCompletedCount(),
                todoList.getTotalCount()
        );
    }

    private TodoListDetailDTO toDetailDTO(TodoList todoList) {
        List<TodoDTO> todoDTOs = todoList.getTodos().stream()
                .map(this::toTodoDTO)
                .collect(Collectors.toList());

        return new TodoListDetailDTO(
                todoList.getId(),
                todoList.getTitle(),
                todoList.getCompletedCount(),
                todoList.getTotalCount(),
                todoDTOs
        );
    }

    private TodoDTO toTodoDTO(Todo todo) {
        return new TodoDTO(
                todo.getId(),
                todo.getText(),
                todo.isCompleted()
        );
    }
}
