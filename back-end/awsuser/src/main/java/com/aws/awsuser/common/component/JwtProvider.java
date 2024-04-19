package com.aws.awsuser.common.component;


import com.aws.awsuser.user.model.UserDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Log4j2
@Component
public class JwtProvider {
    @Value("${jwt.iss}")
    private String issuer;

    //국제 표준 시간
    Instant expiredDate = Instant.now().plus(1, ChronoUnit.DAYS);

    private  final SecretKey secretKey;

    public JwtProvider(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secretKey));
    }

    public String createToken(UserDTO dto){
        String token = Jwts.builder()
                .issuer(issuer)
                .signWith(secretKey)
                .expiration(Date.from(expiredDate))
                .subject("von")
                .claim("username",dto.getUsername())
                .claim("job",dto.getJob())
                .claim("userId",dto.getId())
                .compact();

        log.info("로그인 성공 시 발급된 토근 : "+token);
        return token;
    }

}
