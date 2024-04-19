'use client';

import Header from "@/app/components/common/module/header";
import AxiosConfig from "@/app/components/common/configs/axios-configs";
import { API } from "@/app/components/common/enums/API";
import { PG } from "@/app/components/common/enums/PG";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";


const JoinPage : NextPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [pNum, setPnum] = useState('');
    const [job, setJob] = useState('');


    const handleId = (e: any) => {
        setUserId(e.target.value)
    }

    const handlePW = (e: any) => {
        setPassword(e.target.value)
    }

    const handleName = (e: any) => {
        setName(e.target.value)
    }

    const handlePnum = (e: any) => {
        setPnum(e.target.value)
    }

    const handleJob = (e: any) => {
        setJob(e.target.value)
    }

    const router = useRouter();

    const handleLogin = () => {
        alert('받음')
        const data = { userId, password, name, pNum, job }
        axios.post(`${API.SERVER}/users/join`, data, AxiosConfig())
            .then(res => {
                alert(JSON.stringify(res.data))
                router.push(`${PG.USER}/login`)
            }
            )
    }

    return (
        <>
            <div className="container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label id="email"><b>Email</b></label><br />
                <input type="text" onChange={handleId} placeholder="Enter Email" name="email" id="email_input" required />
                <br /><br />
                <label id="psw"><b>Password</b></label><br />
                <input type="text" onChange={handlePW} placeholder="Enter Password" name="psw" required />
                <br /><br />
                <label id="psw-repeat"><b>User Name</b></label><br />
                <input type="text" onChange={handleName} placeholder="Repeat Password" name="psw-repeat" required />
                <br /><br />
                <label id="psw-repeat"><b>Phone Number</b></label><br />
                <input type="text" onChange={handlePnum} placeholder="Repeat Password" name="psw-repeat" required />
                <br /><br />
                <label id="psw-repeat"><b>Job</b></label><br />
                <input type="text" onChange={handleJob} placeholder="Repeat Password" name="psw-repeat" required />
                <br /><br />

                <p>By creating an account you agree to our <a href="#" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>

                <div className="clearfix">
                    <button type="button" className="cancelbtn">Cancel</button>
                    <button type="submit" className="signupbtn" onClick={handleLogin}>Sign Up</button>
                </div>
            </div>
        </>
    );
}

export default JoinPage