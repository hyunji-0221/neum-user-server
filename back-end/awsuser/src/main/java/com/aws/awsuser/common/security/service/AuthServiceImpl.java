package com.aws.awsuser.common.security.service;

import com.aws.awsuser.common.component.MessengerVO;
import com.aws.awsuser.user.model.UserDTO;
import com.aws.awsuser.user.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository repo;
    @Override
    public MessengerVO login(UserDTO dto) {

        boolean flag = repo.findByUsername(dto.getUsername()).get().getPassword().equals(dto.getPassword());

        return MessengerVO.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .accessToken(flag ? createToken(dto) : "None")
                .build();
    }

    @Override
    public String createToken(UserDTO dto) {
        return null;
    }


}
