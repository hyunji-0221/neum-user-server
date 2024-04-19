package com.aws.awsuser.board.service;

import com.aws.awsuser.board.model.Board;
import com.aws.awsuser.board.model.BoardDTO;
import com.aws.awsuser.common.service.CommandService;
import com.aws.awsuser.common.service.QueryService;

public interface BoardService extends CommandService<BoardDTO>, QueryService<BoardDTO> {



    //추상 메소드 : 오버라이딩되어 로직이 여러 모양으로 바뀔 수 있음.
//    Map<String, ?> test();

    //디폴트 메소드 : 안의 로직이 계속 반복된다면 구현을 한번만 해서 사용.
//    default Map<String,?> dtoToEntity(ArticleDTO dto){
//        Map<String, Article> map = new HashMap<>();
//        Article article = Article.builder().build();
//        map.put("article",article);
//
//        //boardId로 db를 조회해서 해당 게시판에 게시된 글의 목록을 가져올 경우
//        List<ArticleDTO> articleDTOList = new ArrayList<>();
//
//
//
//        return map;
//    }

    //

    default Board dtoToEntity(BoardDTO dto){
        return Board.builder()
                .id(dto.getId())
                .build();
    }
    default BoardDTO entityToDto(Board ent){
        return BoardDTO.builder()
                .id(ent.getId())
                .title(ent.getTitle())
                .description(ent.getDescription())
                .postdate(String.valueOf(ent.getPostdate()))
                .modDate(String.valueOf(ent.getModDate()))
                .build();
    }

}
