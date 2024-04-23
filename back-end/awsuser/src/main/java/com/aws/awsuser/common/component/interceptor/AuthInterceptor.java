package com.aws.awsuser.common.component.interceptor;

import com.aws.awsuser.common.component.security.JwtProvider;
import com.aws.awsuser.user.model.User;
import com.aws.awsuser.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;
import java.util.stream.Stream;

import static java.lang.Long.sum;


//interceptor인터페이스는 서블릿 컨테이너에 있음 -> 스프링에 만들었지만, 서블릿으로 자동으로 들어감
//스프링 컨테이너에 추가하기 위해 만듦
@Log4j2
@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JwtProvider jwtProvider;
    private final UserRepository repository;

    @Override //request
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

//        String token = jwtProvider.extractTokenFromHeader(request);
//        log.info("1- 인터셉터 토큰 로그 Bearer 포함 : {}", token); //로그아웃을 할 때만 찍혀야함...
//        //getPayload() 결과는 payload인데, type이 Claims 임.
//
//        if (token.equals("undefined")) {
//            response.sendError(HttpServletResponse.SC_BAD_REQUEST);//잘못된 요청.
//            return false;
//        }
//
//        Long id = jwtProvider.getPayload(token).get("userId", Long.class);//long.class = 디스크 정적 객체
//        log.info("2- 인터셉터 사용자 id : {}", id);
//
//        Optional<User> user = repository.findById(id);
//        log.info("3- 인터셉터 사용자 정보 : {}", user);
//
//        if (!user.isPresent()) {
//            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);//권한이 없음.
//            return false;
//        }
//
//        log.info("4- 인터셉터 최종 여부 : {}", true);

        return Stream.of(request)
                .map(jwtProvider::extractTokenFromHeader)
                .filter(i->!i.equals("undefined")) //false가 되면 람다식이 끊어지기 때문에 true로...
                .peek(i -> log.info("1- 인터셉터 토큰 로그 Bearer 포함 : {}", i))
                .map(i->jwtProvider.getPayload(i).get("userId", Long.class))
                .peek(i->log.info("2- 인터셉터 사용자 id : {}", i))
                .map(repository::existsById)
                .findAny()
                .isPresent();
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
