package com.aws.awsuser.common.component.interceptor;

import com.aws.awsuser.common.component.security.JwtProvider;
import com.aws.awsuser.user.model.User;
import com.aws.awsuser.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;


//interceptor인터페이스는 서블릿 컨테이너에 있음 -> 스프링에 만들었지만, 서블릿으로 자동으로 들어감
//스프링 컨테이너에 추가하기 위해 만듦
@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtProvider jwtProvider;
    private final UserRepository repository;

    @Override //request
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = jwtProvider.extractTokenFromHeader(request);

        if(ObjectUtils.isEmpty(token) ){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        String strId = jwtProvider.getPayload(token);
        Long id = Long.parseLong(strId);

        Optional<User> user = repository.findById(id);

        if(ObjectUtils.isEmpty(user)){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }

        return true;
    }

    @Override// response
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override //exception
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

}
