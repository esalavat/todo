package com.todo.dto;

public class UpdateTodoListRequest {
    private String title;

    public UpdateTodoListRequest() {
    }

    public UpdateTodoListRequest(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
