import { createAsyncThunk } from "@reduxjs/toolkit";
import { countUsersAPI, deleteUserByIdAPI, existsUsernameAPI, findAllUsersAPI, findUserByIdAPI, loginAPI, modifyUserByIdAPI } from "./user-api";
import exp from "constants";
import { IUser } from "../model/user-model";

export const findAllUsers : any = createAsyncThunk(
    'users/findAllUsers',
    async(page:number)=>{
        console.log('findAllUsers page : '+ page)
        const data : any = await findAllUsersAPI(1)

        return data
    }
)

export const findUserById : any = createAsyncThunk(
    'users/findUserById',
    async(id:number)=>(findUserByIdAPI(id))
)

export const countUsers : any = createAsyncThunk(
    'users/countUsers',
    async() => (await countUsersAPI())
)

export const deleteUserById : any = createAsyncThunk(
    'users/deleteUserById',
    async(id:number) => (await deleteUserByIdAPI(id))
)

export const modifyUserById : any = createAsyncThunk(
    'users/modifyUserById',
    async(getUser:IUser) => {
        console.log('Modify user-service '+JSON.stringify(getUser))
        return await modifyUserByIdAPI(getUser)}
    
)

export const login:any = createAsyncThunk(
    'users/login',
    async(user : IUser)=>{
        console.log('service '+ JSON.stringify(user))
       return await loginAPI(user)
    }
)

export const existsUsername:any = createAsyncThunk(
    'users/existsUsername',
    async(username:IUser)=>(await existsUsernameAPI(username))
)
