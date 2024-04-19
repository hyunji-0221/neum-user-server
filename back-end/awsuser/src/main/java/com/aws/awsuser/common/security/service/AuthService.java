package com.aws.awsuser.common.security.service;


import com.aws.awsuser.common.component.MessengerVO;
import com.aws.awsuser.user.model.UserDTO;

public interface AuthService {
    MessengerVO login(UserDTO dto);
    String createToken(UserDTO dto);
}
