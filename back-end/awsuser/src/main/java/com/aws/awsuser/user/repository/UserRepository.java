package com.aws.awsuser.user.repository;


import com.aws.awsuser.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);

    @Modifying//상태변화
    @Query("update users u set u.token = :token where u.id = :id")
    void modifyTokenById(@Param("token") String token, @Param("id") Long id);

    Boolean existsByUsername(String username);
}
