package com.aws.awsuser.common.component;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Component
@Data
@Builder
public class MessengerVO {

    private String message;
    private int status;
    private String accessToken;
    private String refreshToken;

}
