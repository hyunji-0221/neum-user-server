import { createSlice } from "@reduxjs/toolkit";
import { findAllArticles, findAllByBoardId } from './article-service';
import { IArticle } from "../model/article-model";

const articleThunks = [findAllArticles]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

interface ArticleState{
  array?:Array<IArticle>
}

export const initialState:ArticleState={
  array : []
}


export const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: builder => {
        const {pending, rejected} = status;

        builder
        .addCase(findAllArticles.fulfilled,/* ok가 생략 되어 있음  */ (state: any, {payload}: any) => {state.array = payload})
        //switch case ( ) ; return ; / findAllArticles가 fulfilled라면 뒤 로직을 실행하라.
        //payload - 요청한 데이터 , 200 및 respose 볼 수 있지만 딱 자바에 요청했던 데이터만.

        //state.array와 state.article.array의 차이 / article state와 전체 state의 차이.
        .addCase(findAllByBoardId.fulfilled, (state:any, {payload}:any)=>{state.array = payload})
    }
})
export const getAllArticles = (state: any) => ( state.article.array ) //리턴이 생략됨.

export const getArticlesByBoardId = (state:any)=>(state.article.array)

export const getArticleDetail = (state:any)=>(state.article.json)

export const {} = articleSlice.actions

export default articleSlice.reducer;