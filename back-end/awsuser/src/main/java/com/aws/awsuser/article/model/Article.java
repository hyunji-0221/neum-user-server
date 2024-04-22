package com.aws.awsuser.article.model;

import com.aws.awsuser.board.model.Board;
import com.aws.awsuser.common.model.BaseEntity;
import com.aws.awsuser.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString(exclude = "id")

@Entity(name = "articles") // entity manager가 관리

@Builder
@AllArgsConstructor
public class Article extends BaseEntity {

    @Id
    @Column(name="id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User writer;

    //mock 테스트 477 참고
    public static Article of(Long id, String title, String content){
        Article article = new Article();
        article.id = id;
        article.title = title;
        article.content = content;
        return article;
    }


}
