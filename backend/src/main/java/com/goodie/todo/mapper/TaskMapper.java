package com.goodie.todo.mapper;

import com.goodie.todo.dto.TaskCreateDto;
import com.goodie.todo.dto.TaskDto;
import com.goodie.todo.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskDto toDto(Task source);

    void update(TaskDto source, @MappingTarget Task task);

    Task toEntity(TaskCreateDto taskCreateDto);
}
