package com.aws.awsuser.board;

import com.aws.awsuser.board.model.BoardDTO;
import com.aws.awsuser.board.service.BoardService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor

@RequestMapping(path="/api/boards")
@Slf4j
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})

public class BoardController {
    private final BoardService service;

    @GetMapping(path = "/list")
    public ResponseEntity<List<BoardDTO>> findAll() throws SQLException {
        log.info("정보 : {}");
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(path = "/find")
    public ResponseEntity<Optional<BoardDTO>> findById(@RequestParam("id") Long id){
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping(path = "/count")
    public ResponseEntity<Long> count(){
        return ResponseEntity.ok(service.count());
    }


}
