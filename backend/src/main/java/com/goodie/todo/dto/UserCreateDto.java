package com.goodie.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Schema(description = "Дто для создания пользователя")
@Data
@Accessors(chain = true)
public class UserCreateDto {

    @Schema(description = "Имя пользователя")
    private String name;

    @Schema(description = "Логин")
    private String username;

    @Schema(description = "Пароль")
    private String password;
}
