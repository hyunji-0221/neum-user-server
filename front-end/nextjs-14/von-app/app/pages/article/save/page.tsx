'use client'

import { IArticle } from "@/app/components/articles/model/article-model"
import { findArticleById, saveArticle } from "@/app/components/articles/service/article-service"
import { getArticleDetail } from "@/app/components/articles/service/article-slice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { parseCookies } from "nookies"
import { PG } from "@/app/components/common/enums/PG"
import { getAllBoards } from "@/app/components/boards/service/board-slice"
import { findAllBoards } from "@/app/components/boards/service/board-service"
import { IBoard } from "@/app/components/boards/model/board"

export default function ArticleSavePage() {

    const dispatch = useDispatch()
    const router = useRouter()
    const boards:any = useSelector(getAllBoards)
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        data.boardId = parseInt(data.boardId);
        console.log(JSON.stringify(data))
        dispatch(saveArticle(data))
        .then((res:any)=>{
            alert('게시글 작성 완료')
            router.push(`${PG.ART}/myList/${res.meta.arg.boardId}`)
        })
        .catch((err:any)=>{
            
        })
    }

    useEffect(() => {
        // console.log('토큰을 디코드한 내용 : ')
        // console.log(jwtDecode<any>(parseCookies().accessToken))
    }, [])

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-sm mx-auto">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your board</label>
                <select {...register('boardId', { required: true })}
                    defaultValue={1} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                        boards.map((item:any) => (
                            <option key={item.id} title={item.title} value={item.id} >{item.title}</option>
                        ))
                    }
                </select>
            </div>

            {/* component */}
            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">게시글 작성</div>
            <style dangerouslySetInnerHTML={{ __html: "\n  body {background:white !important;}\n" }} />
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                <input {...register('writerId',{required:true, maxLength:30})}
                    type="hidden" value={jwtDecode<any>(parseCookies().accessToken).userId} readOnly/>
                <input {...register('title', { required: true, maxLength:300 })}
                    className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="text" />
                <textarea {...register('content', { required: true })}
                    className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe everything about this post here" defaultValue={""} />
                {/* icons */}
                <div className="icons flex text-gray-500 m-2">
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                </div>
                {/* buttons */}
                <div className="buttons flex">
                    <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
                    {/*  <div onSubmit={handleSubmit} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div> */}
                    <input type="submit" value="SUBMIT" />
                </div>
            </div>
        </form>
    )
}