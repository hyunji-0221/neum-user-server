'use client'

import { getCount, handleMinus, handlePlus } from "@/app/components/counter/service/counter.slice";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Header from "@/app/components/common/module/header";

const CounterPage : NextPage =() => {

    const count = useSelector(getCount)
    const dispath = useDispatch()

    return (
            // <div>
            //     </div>
            <div className ="text-center mt-500" >
                 <Header></Header>
            <h1>Redux Counter : {count}</h1>

            <AddCircleOutlineIcon onClick={()=>dispath(handlePlus())} >
            </AddCircleOutlineIcon>
            <RemoveCircleOutlineIcon onClick={()=>dispath(handleMinus())}>
            </RemoveCircleOutlineIcon>
        </div>
    );
}

export default CounterPage