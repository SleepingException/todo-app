package com.goodie.todo.dto;

import com.goodie.todo.entity.enums.TaskStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Schema(description = "Дто задачи")
@Data
@Accessors(chain = true)
public class TaskDto {

    @Schema(description = "Идентификатор")
    private Long id;

    @Schema(description = "Название задачи")
    private String name;

    @Schema(description = "Описание задачи")
    private String description;

    @Schema(description = "Дата окончания")
    private LocalDateTime deadline;

    @Schema(description = "Статус")
    private TaskStatus status;
}
