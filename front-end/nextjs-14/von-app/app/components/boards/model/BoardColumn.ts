import { IBoard } from "./board"

export interface BoardColumn{
    id? : number,
    articles? : number,
    title? : string,
    description? : string,
    postdate? : string,
    modDate? : string,
    json? : IBoard,
    array?: []
}