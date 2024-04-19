'use client'

import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { findAllByBoardId } from "@/app/components/articles/service/article-service";
import { getArticlesByBoardId } from "@/app/components/articles/service/article-slice";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArticleColumns from "@/app/components/articles/module/columns";
import MoveButton from "@/app/atoms/button/MoveButton";
import { PG } from "@/app/components/common/enums/PG";

export default function ArticesMyListPage(props:any) {
    
    const dispatch = useDispatch()
    const articles : [] = useSelector(getArticlesByBoardId)

    useEffect(()=>{
        console.log("id : ",props.params.id)
       dispatch(findAllByBoardId(props.params.id))
    },[])

    return (
        <>
            <h1> {props.params.id} 번 게시판 Article 목록 </h1>
            <MoveButton text={"글쓰기"} path={`${PG.ART}/save`}/>
            {/* <Link href={`${PG.ART}/save`}>
                <Button variant="contained">게시판 글쓰기</Button>
            </Link> */}
            <Box sx={{ height: 400, width: '100%' }}>
                {articles && <DataGrid
                    rows={articles}
                    columns={ArticleColumns()}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection
                />}
            </Box>
            
        </>
    )
}

