package com.aws.awsuser.user.service;

import com.aws.awsuser.common.component.MessengerVO;
import com.aws.awsuser.common.service.CommandService;
import com.aws.awsuser.common.service.QueryService;
import com.aws.awsuser.user.model.User;
import com.aws.awsuser.user.model.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService extends CommandService<UserDTO>, QueryService<UserDTO> {

    //command
    MessengerVO modify (UserDTO user);

    //query
    List<UserDTO> findUsersByName(String name);
    List<UserDTO> findUsersByJob(String job);
    Optional<User> findUserByUsername(String username);

    default User dtoToEntity(UserDTO dto){
        System.out.println("UserService dto to entity: "+dto);
        return User.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .job(dto.getJob())
                .build();
    }
    default  UserDTO entityToDto(User ent){
        return UserDTO.builder().id(ent.getId())
                .username(ent.getUsername())
                .password(ent.getPassword())
                .name(ent.getName())
                .email(ent.getEmail())
                .phone(ent.getPhone())
                .job(ent.getJob())
                .build();
    }


    MessengerVO existsUsername(String username);

    MessengerVO login(UserDTO param);

    Boolean logout(String accessToken);
}
