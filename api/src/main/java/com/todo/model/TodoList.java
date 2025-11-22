package com.todo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "todo_lists")
public class TodoList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @OneToMany(mappedBy = "todoList", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Todo> todos = new ArrayList<>();

    public TodoList() {
    }

    public TodoList(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Todo> getTodos() {
        return todos;
    }

    public void setTodos(List<Todo> todos) {
        this.todos = todos;
    }

    public void addTodo(Todo todo) {
        todos.add(todo);
        todo.setTodoList(this);
    }

    public void removeTodo(Todo todo) {
        todos.remove(todo);
        todo.setTodoList(null);
    }

    public int getTotalCount() {
        return todos.size();
    }

    public int getCompletedCount() {
        return (int) todos.stream()
                .filter(Todo::isCompleted)
                .count();
    }
}
