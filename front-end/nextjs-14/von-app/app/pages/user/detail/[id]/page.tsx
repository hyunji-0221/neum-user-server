'use client'

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { IUser } from "@/app/components/users/model/user-model"
import { getUserById, jobHandler, passwordHandler, phoneHandler } from "@/app/components/users/service/user-slice"
import { deleteUserById, findUserById, modifyUserById } from "@/app/components/users/service/user-service"
import { Stack } from "@mui/material"
import { Input } from "@mui/material"
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation"
import { PG } from "@/app/components/common/enums/PG"


export default function UserDetailPage({ params }: any) { // payload를 사용
    const router = useRouter()

    const dispatch = useDispatch()
    const getUser: IUser = useSelector(getUserById)

    useEffect(() => {
        dispatch(findUserById(params.id))
    }, [])

    const  deleteHandle = () =>{
        dispatch(deleteUserById(params.id))
        router.push(`${PG.USER}/list`)
    }
    
    const handleChangePassword = (e:any) => dispatch(passwordHandler(e.target.value))
    const handleChangePhone = (e:any) => dispatch(phoneHandler(e.target.value))
    const handleChangeJob = (e:any) => dispatch(jobHandler(e.target.value))

    const modifyHandle = () => {
        console.log('page '+JSON.stringify(getUser))
        dispatch(modifyUserById(getUser))
        router.push(`${PG.USER}/list`)
    }

    return (
        <>
            <span>ID : </span><Input readOnly sx={{ fontSize: "1.2rem" }} defaultValue={params.id} /> <br /><br />
            <span>이름 : </span><Input readOnly sx={{ fontSize: "1.2rem" }} defaultValue={getUser.name}/> <br /><br />
            <span>사용자ID : </span><Input readOnly sx={{ fontSize: "1.2rem" }} defaultValue={getUser.username} /> <br /><br />
            <span>비밀번호 : </span><Input onChange={handleChangePassword} sx={{ fontSize: "1.2rem" }} defaultValue={getUser.password} /> <br /><br />
            <span>이메일 : </span><Input readOnly sx={{ fontSize: "1.2rem" }} defaultValue={getUser.email}/> <br /><br />
            <span>전화번호 : </span><Input onChange={handleChangePhone} sx={{ fontSize: "1.2rem" }} defaultValue={getUser.phone}/> <br /><br />
            <span>직업 : </span><Input onChange={handleChangeJob} sx={{ fontSize: "1.2rem" }} defaultValue={getUser.job}/> <br /><br />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={modifyHandle}>수정</Button><br />
                <Button variant="contained" onClick={deleteHandle}>탈퇴</Button>
            </Stack>
        </>
    )
}

