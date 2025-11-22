package com.todo.dto;

public class CreateTodoRequest {
    private String text;

    public CreateTodoRequest() {
    }

    public CreateTodoRequest(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
