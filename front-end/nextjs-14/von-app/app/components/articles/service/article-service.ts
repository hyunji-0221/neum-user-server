import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteArticleAPI, findAllArticlesAPI, findAllByBoardIdAPI, findArticleByIdAPI, saveArticleAPI } from "./article-api";
import { IArticle } from "../model/article-model";

export const findAllArticles: any = createAsyncThunk(
    'articles/findAllArticles',
    async (page: number)=>{
        console.log('findAllArticles page : '+ page)
        const data:any = await  findAllArticlesAPI(1);
        return data
    }
)

export const findAllByBoardId:any = createAsyncThunk(
    'articles/findAllByBoardId',
    async(id:any) => (await findAllByBoardIdAPI(id)) 
)

export const findArticleById:any = createAsyncThunk(
    'articles/findArticleById',
    async(art:IArticle) => (await findArticleByIdAPI(art))

)

export const saveArticle:any = createAsyncThunk(
    'articles/saveArticle',
    async(data:IArticle) => {
        console.log('service ' + JSON.stringify(data))
        await saveArticleAPI(data)}
)

export const deleteArticle:any = createAsyncThunk(
    'articles/deleteArticle',
    async(id:number) => {
        console.log('service ' + id)
        await deleteArticleAPI(id)}
)
