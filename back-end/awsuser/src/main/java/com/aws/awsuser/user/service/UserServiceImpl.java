package com.aws.awsuser.user.service;

import com.aws.awsuser.common.component.JwtProvider;
import com.aws.awsuser.common.component.MessengerVO;
import com.aws.awsuser.user.model.User;
import com.aws.awsuser.user.model.UserDTO;
import com.aws.awsuser.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository repo;
    private final JwtProvider jwtProvider;
    @Override
    public MessengerVO save(UserDTO dto) {
        log.info("save from UserServiceImpl : "+dto);
        //dto를 받아서 dto를 반환 근데 repository는 entity밖에 모름
        entityToDto(repo.save(dtoToEntity(dto)));
        return new MessengerVO();
    }

    @Override
    public MessengerVO deleteById(Long id) {
        //id 존재 유무 확인 추가하기 -> 현재 프로젝트에서는 detail page에서 삭제하기 때문에 필요 없음.
        repo.deleteById(id);
        return MessengerVO.builder().message(
                repo.findById(id).isPresent() ? "Success" : "Failure"
        ).build();
    }

    @Override
    public List<UserDTO> findAll() {

        return repo.findAll().stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<UserDTO> findById(Long id) {
        //repo는 entity를 반환하므로 entity->dto
        return repo.findById(id).map(i->entityToDto(i));
    }

    @Override
    public long count() {
        return repo.count();
    }

    @Override
    public boolean existById(Long id) {
        return repo.existsById(id);
    }

    @Override
    public MessengerVO modify(UserDTO userDTO) {
        return MessengerVO.builder().message(
                (repo.save(dtoToEntity(userDTO)) instanceof User) ? "Success" : "Failure"
        ).build();
    }

    @Override
    public List<UserDTO> findUsersByName(String name) {
        throw new UnsupportedOperationException("Unimplemented method 'findUsersByName'");
    }

    @Override
    public List<UserDTO> findUsersByJob(String job) {
        throw new UnsupportedOperationException("Unimplemented method 'findUsersByJob'");
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return repo.findByUsername(username);
    }
    //↑findUserByUsername를 끌고와서 아래 login로직을 구현한다.
    //find 명시되어있는 것이 repo와 연결. 명시되지 않는 곳은 다른 곳에서 가져옴.
    //service는 코드가 길어져도 괜찮음


    //srp에 따라 아이디 존재 여부를 프론트에서 먼저 판단하고, 넘어옴(시큐리티)
    @Transactional
    @Override
    public MessengerVO login(UserDTO dto) {
        User user = repo.findByUsername(dto.getUsername()).get();
        String token = jwtProvider.createToken(entityToDto(user));
        boolean flag = user.getPassword().equals(dto.getPassword());

        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));

        log.info("Token Header : "+header);
        log.info("Token payload : "+payload);

        repo.modifyTokenById(token,user.getId());

        return MessengerVO.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .token(flag ? token : "None")
                .build();
    }

    @Override
    public MessengerVO existsUsername(String username) {
        log.info("service "+username);
        return MessengerVO.builder()
                .message(repo.existsByUsername(username)? "SUCCESS": "FAILURE").build();
    }


}
