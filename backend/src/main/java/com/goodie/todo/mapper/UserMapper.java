package com.goodie.todo.mapper;

import com.goodie.todo.dto.TaskDto;
import com.goodie.todo.dto.UserCreateDto;
import com.goodie.todo.dto.UserDto;
import com.goodie.todo.entity.Task;
import com.goodie.todo.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "taskList", target = "tasks")
    UserDto toDto(User source);

    User toEntity(UserCreateDto source);

    TaskDto mapTask(Task task);
}
