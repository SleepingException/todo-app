package com.goodie.todo.service.task;

import com.goodie.todo.dto.TaskCreateDto;
import com.goodie.todo.dto.TaskDto;
import com.goodie.todo.entity.Task;
import com.goodie.todo.entity.enums.TaskStatus;
import com.goodie.todo.mapper.TaskMapper;
import com.goodie.todo.repository.TaskRepository;
import com.goodie.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskDto create(TaskCreateDto createDto, String username) {
        Task task = taskMapper.toEntity(createDto);
        task.setStatus(TaskStatus.TO_DO);
        task.setUser(userRepository.findByUsername(username).get());

        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public TaskDto update(TaskDto taskDto) {
        Task task = taskRepository.findById(taskDto.getId())
                .orElse(new Task());

        taskMapper.update(taskDto, task);

        return taskMapper.toDto(taskRepository.save(task));
    }

    @Override
    public void remove(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
