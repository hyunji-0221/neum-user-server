package com.aws.awsuser.article.repository;

import com.aws.awsuser.article.model.Article;
import com.aws.awsuser.article.model.ArticleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {
    // JPQL default 방식
    @Query("select a " +
            "from articles a where a.board.id = :boardId order by a.id desc ")
    public List<Article> getArticlesByBoardId(@Param("boardId") Long boardId);
    // Query Method 방식
    List<Article> findAllByOrderByIdDesc();

    @Query("select a.title from articles a where a.title = :title")
    public boolean existsByArticleTitle(@Param("title") String title);



    //Native - 한두개 담는것 외에 사용하지말것 ts에서 힘들어짐.
    @Query(value = "select * from articles a where a.board.id = :boardId", nativeQuery = true)
    public List<Map<String, Objects>> getQnaArticles(@Param("boardId")Long boardId);

    //JPSQL Return Type DTO
    String articleDtoMapping = "new com.aws.awsuser.article.model.ArticleDTO(" +
            "a.id, a.title, a.content, a.writer.id, a.board.id" +
            ", a.regDate, a.modDate";

    boolean existsByTitle (String title);


}
