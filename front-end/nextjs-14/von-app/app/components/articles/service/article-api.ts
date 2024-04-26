import instance from "@/app/components/common/configs/axios-configs"
import { IArticle } from "../model/article-model"

export const findAllArticlesAPI = async (page:number) => {
    try {
        return (await instance().get('/articles/list', {
            params: {page, size: 10, limit: 10}
        })).data
    } catch (error) {
        return error
    }
}

export const findAllByBoardIdAPI = async(id:number) => {
    try{
        return (await instance().get('/articles/listById',{
            params : {id}
        })).data
    }catch(error){
        return error
    }
}

export const findArticleByIdAPI = async(art:IArticle) =>{
    try{
        return (await instance().post('/articles/findById', art)).data
    }catch(error){
        return error
    }
}

export const saveArticleAPI = async(data:IArticle) =>{
    try{
        console.log('api '+JSON.stringify(data))
        return (await instance().post('/articles/save',data)).data
    }catch(error){
        return error
    }
}

export const deleteArticleAPI = async(id:number) => {
    try{
        return (await instance().delete('/articles/delete',{
            params : {id}
        })).data
    }catch(error){
        return error
    }
}