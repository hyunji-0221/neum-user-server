package com.aws.awsuser.article.service;


import com.aws.awsuser.article.model.Article;
import com.aws.awsuser.article.model.ArticleDTO;
import com.aws.awsuser.article.repository.ArticleRepository;
import com.aws.awsuser.board.model.Board;
import com.aws.awsuser.board.repository.BoardRepository;
import com.aws.awsuser.common.component.MessengerVO;
import com.aws.awsuser.user.model.User;
import com.aws.awsuser.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Log4j2
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository repo;
    private final UserRepository userRepo;
    private final BoardRepository boardRepo;

    @Override
    public MessengerVO save(ArticleDTO dto) {
        log.info("service dto 너머옴 " + dto);
        Article ac = Article.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .board(boardRepo.findById(dto.getBoardId()).orElseThrow(null))
                .writer(userRepo.findById(1L).orElseThrow(null))
                .build();
        log.info("저장 이후 : {}", ac);
        repo.save(ac);
        return MessengerVO.builder()
                .message(
                        repo.existsByTitle(dto.getTitle()) ? "SUCCESS" : "FAILURE"
                )
                .id(ac.getBoard().getId())
                .build();
    }

    @Override
    public MessengerVO deleteById(Long id) {
        return new MessengerVO();
    }

    @Override
    public MessengerVO modify(ArticleDTO articleDTO) {
        return null;
    }

    @Override
    public List<ArticleDTO> findAll() {
        return repo.findAll().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<ArticleDTO> findById(Long id) {
        //repo는 entity를 반환하므로 entity->dto
        return repo.findById(id).map(i -> entityToDto(i));
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
    public List<ArticleDTO> getArticlesByBoardId(Long boardId) {
        List<Article> article = repo.getArticlesByBoardId(boardId);
        if (null != article) {
            return article.stream().map(e -> entityToDto(e)).toList();
        } else {
            return Collections.emptyList();
        }
    }


}
