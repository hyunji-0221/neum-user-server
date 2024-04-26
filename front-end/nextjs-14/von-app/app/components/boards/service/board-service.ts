import { createAsyncThunk } from "@reduxjs/toolkit";
import { countBoardsAPI, findAllBoardsAPI, findBoardByIdAPI } from "./board-api";

export const findAllBoards : any = createAsyncThunk(
    'boards/findAllBoards',
    async(page:number)=>{ 
        console.log('service ')
        const data : any = await findAllBoardsAPI(1)
        return data
    }
)

export const findBoardById : any = createAsyncThunk(
    'boards/findBoardById',
    async(id : number)=>(await findBoardByIdAPI(id))
)

export const countBoards : any = createAsyncThunk(
    'boards/countBoards',
    async() => (await countBoardsAPI())
)
