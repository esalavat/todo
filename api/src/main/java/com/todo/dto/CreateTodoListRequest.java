package com.todo.dto;

public class CreateTodoListRequest {
    private String title;

    public CreateTodoListRequest() {
    }

    public CreateTodoListRequest(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
