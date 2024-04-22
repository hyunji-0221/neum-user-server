import instance from "@/app/components/common/configs/axios-configs"
import { IArticle } from "../model/article-model"

export const findAllArticlesAPI = async (page:number) => {
    try {
        return (await instance.get('/articles/list', {
            params: {page, size: 10, limit: 10}
        })).data
    } catch (error) {
        return error
    }
}

export const findAllByBoardIdAPI = async(id:number) => {
    try{
        return (await instance.get('/articles/listById',{
            params : {id}
        })).data
    }catch(error){
        return error
    }
}

export const findArticleByIdAPI = async(art:IArticle) =>{
    try{
        return (await instance.post('/articles/save', art)).data
    }catch(error){
        return error
    }
}