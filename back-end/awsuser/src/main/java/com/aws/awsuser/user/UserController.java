package com.aws.awsuser.user;

import com.aws.awsuser.common.component.MessengerVO;
import com.aws.awsuser.user.model.UserDTO;
import com.aws.awsuser.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/users") //공통된 부분
@Slf4j
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "dd")})
public class UserController {
    private final UserService service;

    @PostMapping(path = "/save")
    public ResponseEntity<MessengerVO> save(@RequestBody UserDTO user) {
        log.info("save from UserController : "+user);
        return ResponseEntity.ok(service.save(user));
    }

    @GetMapping("/list")
    public ResponseEntity<List<UserDTO>> findAll() {
        log.info("입력받은 정보 : {}");
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/detail") //@PathVariable 어노테이션은 파라미터변수와 같아야함.
    public ResponseEntity<Optional<UserDTO>> findUserById(@RequestParam Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/modify")
    public ResponseEntity<MessengerVO> modify(@RequestBody UserDTO userDTO) {
        log.info("userController modify : {}",userDTO);
        return ResponseEntity.ok(service.modify(userDTO));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessengerVO> deleteUser(@RequestParam Long id) {
        log.info("delete 결과 : {}",service.deleteById(id));
        return ResponseEntity.ok(service.deleteById(id));
    }

    @PostMapping("/searchJob")
    public Map<String, ?> findUserByJob(@RequestBody Map<?, ?> paramap) {
        Map<String, String> response = new HashMap<>();
        return response;
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countUser() {
        return ResponseEntity.ok(service.count());
    }

    @PostMapping("/search")
    public ResponseEntity<List<UserDTO>> findUsersByName(@RequestBody String name) {
        return ResponseEntity.ok(service.findUsersByName(name));
    }

    @PostMapping("/login")
    public ResponseEntity<MessengerVO> login(@RequestBody UserDTO param) {
        //controller는 로직을 주지 않을 것임.
        return ResponseEntity.ok(service.login(param));
    }

    @GetMapping("/exists-username")
    public ResponseEntity<MessengerVO> existsUsername(@RequestParam("username") String username){
        log.info("컨트롤러 "+username);
        return ResponseEntity.ok(service.existsUsername(username));
    }

}