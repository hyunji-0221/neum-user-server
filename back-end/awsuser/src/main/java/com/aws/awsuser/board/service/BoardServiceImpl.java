package com.aws.awsuser.board.service;

import com.aws.awsuser.board.model.BoardDTO;
import com.aws.awsuser.board.repository.BoardRepository;
import com.aws.awsuser.common.component.MessengerVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
    private final BoardRepository repo;


    @Override
    public MessengerVO save(BoardDTO dto) {
        //dto를 받아서 dto를 반환 근데 repository는 entity밖에 모름
        repo.save(dtoToEntity(dto));
        return new MessengerVO();
    }

    @Override
    public MessengerVO deleteById(Long id) {
        return new MessengerVO();
    }

    @Override
    public MessengerVO modify(BoardDTO boardDTO) {

        throw new UnsupportedOperationException("Unimplemented method 'updatePassword'");
    }

    @Override
    public List<BoardDTO> findAll() {
        return repo.findAll().stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<BoardDTO> findById(Long id) {
        //repo는 entity를 반환하므로 entity->dto
        return repo.findById(id).map(i->entityToDto(i));
    }

    @Override
    public long count() {
        return repo.count();
    }

    @Override
    public boolean existById(Long id) {
        return repo.existsById(id);
    }
}
