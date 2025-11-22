package com.todo.dto;

public class TodoListSummaryDTO {
    private Long id;
    private String title;
    private int completedCount;
    private int totalCount;

    public TodoListSummaryDTO() {
    }

    public TodoListSummaryDTO(Long id, String title, int completedCount, int totalCount) {
        this.id = id;
        this.title = title;
        this.completedCount = completedCount;
        this.totalCount = totalCount;
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
}
