package com.goodie.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Schema(description = "Информация о пользователе")
@Data
@Accessors(chain = true)
public class UserDto {
    @Schema(description = "Имя пользователя")
    private String name;

    @Schema(description = "Список задач")
    private List<TaskDto> tasks;
}
