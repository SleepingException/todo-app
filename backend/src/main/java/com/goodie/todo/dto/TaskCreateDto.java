package com.goodie.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Schema(description = "Дто для создания задачи")
@Data
public class TaskCreateDto {

    @Schema(description = "Название задачи")
    private String name;

    @Schema(description = "Описание задачи")
    private String description;

    @Schema(description = "Дата окончания")
    private LocalDateTime deadline;
}
