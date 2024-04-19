package com.aws.awsuser.article;

import com.aws.awsuser.article.model.Article;
import com.aws.awsuser.article.model.ArticleDTO;
import com.aws.awsuser.article.service.ArticleService;
import com.aws.awsuser.common.component.MessengerVO;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor

@RequestMapping(path="/api/articles")
@Slf4j


@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})

public class ArticleController {
    private final ArticleService service;

    @PostMapping( "/save")
    public ResponseEntity<MessengerVO> save(@RequestBody ArticleDTO dto) throws SQLException {
        log.info("dto 넘어옴 "+dto);
        return ResponseEntity.ok(service.save(dto));
    }

    @DeleteMapping(path = "/delete")
    public ResponseEntity<MessengerVO> deleteById(@RequestParam long id) throws SQLException {
        service.deleteById(0L);
        return ResponseEntity.ok(new MessengerVO());
    }

    @GetMapping(path = "/list")
    public ResponseEntity<List<ArticleDTO>> findByBoardId() throws SQLException {
        log.info("정보 : {}");
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(path = "/find")
    public ResponseEntity<List<ArticleDTO>> findById(@RequestParam Long userId){
        return null;
    }

    @GetMapping(path = "/count")
    public ResponseEntity<MessengerVO> count(Pageable pageable) throws SQLException {
        service.count();
        return ResponseEntity.ok(new MessengerVO());
    }
//
//    @GetMapping(path = "/exists")
//    public boolean existById(@RequestParam Long id) throws SQLException {
//        log.info("아티클 아이디" ,service.existById(id));
//        return service.existById(id);
//    }

    @GetMapping(path = "/listById")
    public ResponseEntity<List<ArticleDTO>> findAllByBoardId(@RequestParam("id") Long boardId){
        return ResponseEntity.ok(service.getArticlesByBoardId(boardId));
    }

}
