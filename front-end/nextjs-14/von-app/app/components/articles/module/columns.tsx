import { GridColDef } from "@mui/x-data-grid";
import { ArticleColumn } from "../model/ArticleColumn";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { PG } from "../../common/enums/PG";
import { useDispatch } from "react-redux";
import { deleteArticle } from "../service/article-service";
import { useRouter } from "next/navigation";

//타입의 정의는 function 밖에서
interface CellType {
    row: ArticleColumn
}


export default function ArticleColumns(): GridColDef[] {

    const dispatch = useDispatch()
    const router = useRouter()

    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'ID',
            renderCell: ({ row }: CellType) =>
                <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.id}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: 'Title',
            renderCell: ({ row }: CellType) =>
                <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>
                    <Link href={`${PG.ART}/detail/${row.id}`}> {row.title}</Link>
                </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'content',
            headerName: 'Content',
            renderCell: ({ row }: CellType) =>
                <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.content}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'writeId',
            headerName: 'writeId',
            renderCell: ({ row }: CellType) =>
                <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.writeId}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'boardId',
            headerName: 'boardId',
            renderCell: ({ row }: CellType) =>
                <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.boardId}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'postdate',
            headerName: 'PostDate',
            renderCell: ({ row }: CellType) =>
                <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.postdate}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modDate',
            headerName: 'modDate',
            renderCell: ({ row }: CellType) =>
                <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.modDate}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'delete',
            headerName: '삭제',
            renderCell: ({ row }: CellType) =>
                <Button onClick={() => {
                    if (window.confirm("article 삭제합니다.")) {
                        dispatch(deleteArticle(row.id))
                        .then((res:any)=>{
                        console.log(JSON.stringify(res))

                        })
                        // location.reload()
                    } else {
                        alert('취소하였습니다.')
                    }

                }}>삭제</Button>
        },
    ]
}

