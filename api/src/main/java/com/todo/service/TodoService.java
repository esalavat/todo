package com.todo.service;

import com.todo.dto.CreateTodoRequest;
import com.todo.dto.TodoDTO;
import com.todo.dto.UpdateTodoRequest;
import com.todo.model.Todo;
import com.todo.model.TodoList;
import com.todo.repository.TodoListRepository;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;
    private final TodoListRepository todoListRepository;

    public TodoService(TodoRepository todoRepository, TodoListRepository todoListRepository) {
        this.todoRepository = todoRepository;
        this.todoListRepository = todoListRepository;
    }

    public TodoDTO createTodo(Long todoListId, CreateTodoRequest request) {
        TodoList todoList = todoListRepository.findById(todoListId)
                .orElseThrow(() -> new RuntimeException("TodoList not found with id: " + todoListId));

        Todo todo = new Todo(request.getText(), false);
        todoList.addTodo(todo);
        todoListRepository.save(todoList);

        return toDTO(todo);
    }

    public TodoDTO updateTodo(Long todoListId, Long todoId, UpdateTodoRequest request) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + todoId));

        if (!todo.getTodoList().getId().equals(todoListId)) {
            throw new RuntimeException("Todo does not belong to the specified TodoList");
        }

        if (request.getText() != null) {
            todo.setText(request.getText());
        }
        if (request.getCompleted() != null) {
            todo.setCompleted(request.getCompleted());
        }

        Todo updated = todoRepository.save(todo);
        return toDTO(updated);
    }

    public TodoDTO toggleTodo(Long todoListId, Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + todoId));

        if (!todo.getTodoList().getId().equals(todoListId)) {
            throw new RuntimeException("Todo does not belong to the specified TodoList");
        }

        todo.setCompleted(!todo.isCompleted());
        Todo updated = todoRepository.save(todo);
        return toDTO(updated);
    }

    public void deleteTodo(Long todoListId, Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + todoId));

        if (!todo.getTodoList().getId().equals(todoListId)) {
            throw new RuntimeException("Todo does not belong to the specified TodoList");
        }

        todoRepository.delete(todo);
    }

    private TodoDTO toDTO(Todo todo) {
        return new TodoDTO(
                todo.getId(),
                todo.getText(),
                todo.isCompleted()
        );
    }
}
