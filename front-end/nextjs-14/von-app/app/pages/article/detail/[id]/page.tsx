'use client'

import { findArticleById } from "@/app/components/articles/service/article-service";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function ArticleDetailPage (props:any) {
    const dispatch = useDispatch();
    const article = useSelector(getArticleById);
    const router = useRouter()
    useEffect(() => {
        dispatch(findArticleById(props.params.id))
    },[])
    const handleDelete = (e:any) => {
        dispatch(deleteArticle(props.params.id))
        alert("삭제되었습니다.")
        router.replace(`${PG.ARTICLE}/list`)
    }
    // const handleModify = (e:any) => {
    //     dispatch(modifyUser(user))
    //     alert("변경되었습니다.")
    //     router.refresh()
    // }
    return (
        <div>
        <h2>사용자 상세정보</h2>
        <p className="text-base">id : {article.id}</p>
            <p className="text-base">제목 : {article.title}</p>
            <p className="text-base">내용 : {article.content}</p>
            <p className="text-base">작성일 : {article.regDate}</p>
            <p className="text-base">변경일 : {article.modDate}</p>
        <Button variant="outlined">수정</Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>삭제</Button>
        </div>
    )
}