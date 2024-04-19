'use client'

import Header from "@/app/components/common/module/header";
import UsersColumns from "@/app/components/users/module/columns";
import { countUsers, findAllUsers } from "@/app/components/users/service/user-service";
import { getAllUsers, getCountsUsers } from "@/app/components/users/service/user-slice";
import { DataGrid } from "@mui/x-data-grid";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const UserPage: NextPage = () => {
    const dispatch = useDispatch()
    const [pageSize, setPageSize] = useState(5); // 4-1
    const usersArray: [] = useSelector(getAllUsers)
    
    const countDispatch = useDispatch()
    const users : number = useSelector(getCountsUsers)
    
    useEffect(() => {
        countDispatch(countUsers())
        dispatch(findAllUsers(1))
    }, [])

    return (
        <>
            <h2>All Users Page : {users} 개의 목록이 있습니다.</h2>
            <div style={{ height: "100%", width: "100%" }}>
                {usersArray && <DataGrid // 🔥 4
                    rows={usersArray}
                    columns={UsersColumns()}
                    pageSizeOptions={[5, 10, 20]} // 5개보기, 10개보기, 20개보기
                    checkboxSelection
                />}
            </div>
        </>
    )

}

export default UserPage