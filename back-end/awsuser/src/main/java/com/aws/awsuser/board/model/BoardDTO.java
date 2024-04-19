package com.aws.awsuser.board.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Log4j2
@Data // getter, settter, toString

@Component
public class BoardDTO {

    private Long id;

    private String title;
    private String description;

    private Long articles;

    private String postdate;
    private String modDate;
}
