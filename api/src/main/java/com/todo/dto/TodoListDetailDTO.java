package com.todo.dto;

import java.util.List;

public class TodoListDetailDTO {
    private Long id;
    private String title;
    private int completedCount;
    private int totalCount;
    private List<TodoDTO> todos;

    public TodoListDetailDTO() {
    }

    public TodoListDetailDTO(Long id, String title, int completedCount, int totalCount, List<TodoDTO> todos) {
        this.id = id;
        this.title = title;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
        this.todos = todos;
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

    public int getCompletedCount() {
        return completedCount;
    }

    public void setCompletedCount(int completedCount) {
        this.completedCount = completedCount;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public List<TodoDTO> getTodos() {
        return todos;
    }

    public void setTodos(List<TodoDTO> todos) {
        this.todos = todos;
    }
}
