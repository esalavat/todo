package com.todo.config;

import com.todo.model.Todo;
import com.todo.model.TodoList;
import com.todo.repository.TodoListRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(TodoListRepository todoListRepository) {
        return args -> {
            // Shopping List
            TodoList shoppingList = new TodoList("Shopping List");
            shoppingList.addTodo(new Todo("Buy milk", true));
            shoppingList.addTodo(new Todo("Buy eggs", false));
            shoppingList.addTodo(new Todo("Buy bread", true));
            shoppingList.addTodo(new Todo("Buy butter", false));
            shoppingList.addTodo(new Todo("Buy coffee", false));
            todoListRepository.save(shoppingList);

            // Work Tasks
            TodoList workTasks = new TodoList("Work Tasks");
            workTasks.addTodo(new Todo("Review pull requests", true));
            workTasks.addTodo(new Todo("Update documentation", true));
            workTasks.addTodo(new Todo("Fix bug #123", false));
            workTasks.addTodo(new Todo("Refactor auth module", true));
            workTasks.addTodo(new Todo("Write unit tests", false));
            workTasks.addTodo(new Todo("Deploy to staging", true));
            workTasks.addTodo(new Todo("Team meeting notes", true));
            workTasks.addTodo(new Todo("Update project roadmap", false));
            todoListRepository.save(workTasks);

            // Personal Goals
            TodoList personalGoals = new TodoList("Personal Goals");
            personalGoals.addTodo(new Todo("Exercise 3x per week", false));
            personalGoals.addTodo(new Todo("Read 2 books this month", true));
            personalGoals.addTodo(new Todo("Learn React hooks", false));
            todoListRepository.save(personalGoals);

            // Home Improvements
            TodoList homeImprovements = new TodoList("Home Improvements");
            homeImprovements.addTodo(new Todo("Paint living room", true));
            homeImprovements.addTodo(new Todo("Fix leaky faucet", false));
            homeImprovements.addTodo(new Todo("Replace light fixtures", true));
            homeImprovements.addTodo(new Todo("Install shelves", false));
            homeImprovements.addTodo(new Todo("Clean gutters", false));
            homeImprovements.addTodo(new Todo("Organize garage", true));
            homeImprovements.addTodo(new Todo("Plant flowers", false));
            homeImprovements.addTodo(new Todo("Repair fence", false));
            homeImprovements.addTodo(new Todo("Update thermostat", true));
            homeImprovements.addTodo(new Todo("Clean carpets", false));
            homeImprovements.addTodo(new Todo("Replace air filters", false));
            homeImprovements.addTodo(new Todo("Trim bushes", false));
            todoListRepository.save(homeImprovements);

            System.out.println("Database initialized with sample data");
        };
    }
}
