package com.goodie.todo.service.task;

import com.goodie.todo.dto.TaskCreateDto;
import com.goodie.todo.dto.TaskDto;

public interface TaskService {

    TaskDto create(TaskCreateDto createDto, String username);

    TaskDto update(TaskDto taskDto);

    void remove(Long taskId);
}
