import { createSlice } from "@reduxjs/toolkit"
import { countUsers, deleteUserById, existsUsername, findAllUsers, findUserById, login, modifyUserById } from "./user-service"
import exp from "constants"
import { IUser } from "../model/user-model"

const userThunks = [findAllUsers]

const status = {
    pending : 'pending',
    fulfilled : 'fulfilled',
    rejected : 'rejected'
}

interface IAuth {
    message? : string,
    token? : string
}

interface UserState {
    array? : Array<IUser>,
    json?: IUser,
    auth? : IAuth,
}

export const initialState : UserState = {
    json : {} as IUser, //IUser user = new IUser와 같은 의미 
    array : [],
    auth : {} as IAuth
}


export const userSlice = createSlice({
    name : "users",
    initialState,
    //내부의 값을 return 할 때 사용
    reducers : {
        passwordHandler:(state:any,{payload}) => {state.json.password = payload},
        phoneHandler:(state:any,{payload}) => {state.json.phone = payload},
        jobHandler:(state:any,{payload}) => {state.json.job = payload},

    },
    //axios에서 return 할 때 사용
    extraReducers : builder => {
        const {pending, rejected} = status;

        builder
        .addCase(findAllUsers.fulfilled, (state : any, {payload} : any)=>{state.array = payload})
        .addCase(findUserById.fulfilled, (state : any, {payload} : any)=>{state.json = payload})
        .addCase(countUsers.fulfilled, (state : any, {payload} : any)=>{state.number = payload})
        .addCase(deleteUserById.fulfilled, (state : any, {payload} : any)=>{state.message = payload})
        .addCase(modifyUserById.fulfilled, (state :any, {payload}:any)=>{state.message=payload})
        .addCase(login.fulfilled, (state :any, {payload}:any)=>{state.auth=payload }) //이미 user의ㅡ 내부
        .addCase(existsUsername.fulfilled, (state:any, {payload}:any)=>{state.message=payload})
    }
})

export const getAllUsers = (state : any) => {
    console.log('--------------before useSelector--------------')
    console.log(JSON.stringify(state.user.array))
    return state.user.array;
}

export const getUserById = ( state : any ) => ( state.user.json )
export const getCountsUsers = ( state : any ) => ( state.user.number )

export const getLoginResult = ( state : any ) => state.user.auth  //user의 외부

export const getUsernameResult = (state : any) => {
    console.log('slice '+JSON.stringify(state.user.message))
    return state.user.message}

export const{ passwordHandler, phoneHandler, jobHandler } = userSlice.actions
export default userSlice.reducer;