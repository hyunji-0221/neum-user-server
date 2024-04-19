package com.aws.awsuser.user.model;

import com.aws.awsuser.article.model.Article;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor

@Builder
@Data
@ToString(exclude = "token")
@Entity(name = "users")

public class User {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String job; // admin 사이트 관리자 , 나머지 소비자(사이트 이용자)

    private String token;

    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Article> articles;
}
