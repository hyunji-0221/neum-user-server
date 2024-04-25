package com.aws.awsuser.board.repository;

import com.aws.awsuser.article.model.Article;
import com.aws.awsuser.board.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface BoardRepository extends JpaRepository<Board,Long> {
}
