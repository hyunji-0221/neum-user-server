import { createSlice } from "@reduxjs/toolkit"
import { countBoards, findAllBoards, findBoardById } from "./board-service"
import { retry } from "@reduxjs/toolkit/query"
import { IBoard } from "../model/board"

const userThunks = [findAllBoards]

const status = {
    pending : 'pending',
    fulfilled : 'fulfilled',
    rejected : 'rejected'
}

//json, array가 iboard에 있으면 iborad 안에 iboard가 존재하는 구조가 되기때문에 slice에 분리 시켜줌.
interface BoardState{
    json:IBoard,
    array:Array<IBoard>,
    count?:number
}

export const initialState:BoardState={
    json: {} as IBoard,
    array: [],
    count:0
}

export const boardSlice = createSlice({
    name : "boards",
    initialState,
    reducers : {},
    extraReducers : builder => {
        const {pending, rejected} = status;

        builder
        .addCase(findAllBoards.fulfilled, (state : any, {payload} : any)=>{ state.array = payload })
        .addCase(findBoardById.fulfilled, (state : any, {payload} : any)=>{ state.json = payload })
        .addCase(countBoards.fulfilled, (state : any, {payload}:any)=>{ state.number=payload })
    }
})

export const getAllBoards = (state : any) => {
    console.log('--------------before useSelector--------------')
    console.log(JSON.stringify(state.board.array))
    return state.board.array
}

export const getSingleBoard = (state :any) => (state.board.json)

export const getCountsBoards = (state:any) => (state.board.number)


export const{} = boardSlice.actions
export default boardSlice.reducer;