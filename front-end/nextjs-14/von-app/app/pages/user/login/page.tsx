'use client';

import Header from "@/app/components/common/module/header";
import AxiosConfig from "@/app/components/common/configs/axios-configs";
import { API } from "@/app/components/common/enums/API";
import { PG } from "@/app/components/common/enums/PG";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";


const LoginPage : NextPage = () => {

    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (e: any) => {
        setUsername(e.target.value)
    }
    const handlePW = (e: any) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e : any) => {
        e.preventDefault()

        const data = { username, password }
        
        axios.post(`${API.SERVER}/users/login`, data, AxiosConfig())
            .then(res => {
                const message = res.data.message
                alert(message)
                
                if(message==='SUCCESS'){
                    router.push(`${PG.BOARD}/articles`)
                }else if (message==='FAIL'){
                    alert("Fail")
                }else{
                    alert("지정되지 않은 값")
                }
            })
    }

    return (
        <>
            <h2>로그인 화면</h2>
            <input type="text" onChange={handleId}></input><br />
            <input type="text" onChange={handlePW}></input>
            <button onClick={handleSubmit}>전송</button>
        </>
    );

}

export default LoginPage;