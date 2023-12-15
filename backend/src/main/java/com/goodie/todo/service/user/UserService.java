package com.goodie.todo.service.user;

import com.goodie.todo.dto.UserCreateDto;
import com.goodie.todo.dto.UserDto;
import org.apache.coyote.BadRequestException;

public interface UserService {

    UserDto create(UserCreateDto dto) throws BadRequestException;

    UserDto getByUsername(String username) throws BadRequestException;
}
