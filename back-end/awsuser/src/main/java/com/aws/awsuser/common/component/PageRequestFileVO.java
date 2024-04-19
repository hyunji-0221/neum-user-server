package com.aws.awsuser.common.component;

import com.aws.awsuser.article.model.ArticleDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;


@AllArgsConstructor
@Component
@Data
@Builder
//페이지 단위로 데이터
public class PageRequestFileVO {

    private int page;
    private int size;
    private String type;
    private String keyword;

    private List<ArticleDTO> pageFileDto;

    public PageRequestFileVO(){
        this.page = 1;
        this.size = 10;
    }

    public Pageable getPageable(Sort sort){
        return PageRequest.of(page -1, size, sort);
    }

}
