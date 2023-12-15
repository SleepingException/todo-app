package com.goodie.todo.controller;

import com.goodie.todo.dto.TaskDto;
import com.goodie.todo.dto.UserCreateDto;
import com.goodie.todo.dto.UserDto;
import com.goodie.todo.service.user.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "API пользователей")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserDto reisterUser(@RequestBody UserCreateDto dto) throws BadRequestException {
        return userService.create(dto);
    }

    @GetMapping("/current")
    public UserDto current() throws BadRequestException {
        UserDetails currentUser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getByUsername(currentUser.getUsername());
    }

    @GetMapping("/current/tasks")
    public List<TaskDto> getUserTasks() throws BadRequestException {
        UserDetails currentUser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getByUsername(currentUser.getUsername()).getTasks();
    }

    @Hidden
    @PostMapping("/after-auth")
    public UserDto afterAuth() throws BadRequestException {
        UserDetails currentUser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getByUsername(currentUser.getUsername());
    }
}
