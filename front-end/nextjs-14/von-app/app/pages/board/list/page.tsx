'use client'

import CardButton from "@/app/atoms/button/CardButton"
import { IBoard } from "@/app/components/boards/model/board"
import { findAllBoards } from "@/app/components/boards/service/board-service"
import { getAllBoards } from "@/app/components/boards/service/board-slice"
import { Stack } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function BoardCardPage() {

    // const dispatch = useDispatch()
    // const allBoards = useSelector(getAllBoards)

    // console.log("allboard : " + JSON.stringify(allBoards))

    // useEffect(() => {
    //     dispatch(findAllBoards(1))
    // }, [])

    return (
        <>
            <h1>게시판 목록 들어옴</h1>
            {/* <Stack direction="row" spacing={2}>
                {allBoards.map((board: IBoard) => (
                    <CardButton id={board.id} title={board.title} description={board.description} />
                ))}
            </Stack> */}
        </>
    )
}