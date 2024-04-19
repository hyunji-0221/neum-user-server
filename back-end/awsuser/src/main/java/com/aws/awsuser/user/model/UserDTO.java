package com.aws.awsuser.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Log4j2
@Data // getter, settter, toString

@Component
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String job;

    private String postdate;
    private String modDate;

    private Long articles;


    private String token;
}
