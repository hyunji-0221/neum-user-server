package com.aws.awsuser.common.config;

import com.aws.awsuser.common.component.interceptor.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {//인터셉터를 스프링에 추가하기 위해 메소드를 오버라이딩
    //servlet에 있는 애 등록시켜
    private final AuthInterceptor authInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/**"); //이 경로로 들어오는 요청은 토큰이 없더라도 요청을 받아드림. = 인터셉터를 타지 않음.
    }

}
