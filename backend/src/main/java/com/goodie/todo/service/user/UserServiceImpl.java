package com.goodie.todo.service.user;

import com.goodie.todo.dto.UserCreateDto;
import com.goodie.todo.dto.UserDto;
import com.goodie.todo.entity.Authority;
import com.goodie.todo.entity.User;
import com.goodie.todo.mapper.UserMapper;
import com.goodie.todo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;

    @Override
    public UserDto create(UserCreateDto dto) throws BadRequestException {
        Optional<User> existUser = userRepository.findByUsername(dto.getUsername());
        if (existUser.isPresent()) {
            throw new BadRequestException("Пользователь с таким логином уже существует");
        }
        User user = userMapper.toEntity(dto);
        Authority userAuthority = new Authority();
        userAuthority.setUsername(user.getUsername());
        userAuthority.setAuthority("USER");
        user.setAuthority(userAuthority);
        user.setEnabled(true);
        user.setPassword(encoder.encode(user.getPassword()));

        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public UserDto getByUsername(String username) throws BadRequestException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new BadRequestException("Отсутствует пользователь с таким логином");
        }

        return userMapper.toDto(user.get());
    }
}
