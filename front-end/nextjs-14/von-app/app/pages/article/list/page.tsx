'use client'

import MoveButton from "@/app/atoms/button/MoveButton"
import ArticleColumns from "@/app/components/articles/module/columns"
import { findAllArticles } from "@/app/components/articles/service/article-service"
import { getAllArticles } from "@/app/components/articles/service/article-slice"
import { PG } from "@/app/components/common/enums/PG"
import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function ArticesListPage(props:any) {
    
    const dispatch = useDispatch()
    const articles : [] = useSelector(getAllArticles)

    useEffect(()=>{
        console.log("id : ",props.params.id)
       dispatch(findAllArticles(props.params.id))
    },[])

    return (
        <>
            <h1> 모든 게시판 글목록 </h1>
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

