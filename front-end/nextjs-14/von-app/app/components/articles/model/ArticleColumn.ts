//Entity와 같은 거라고 생각
//.ts는 TypeScript 문법

export interface ArticleColumn{
    id? : number,
    title? : string,
    content? : string,
    writeId? : number,
    boardId? : number, 
    postdate? : string,
    modDate? : string, 
    array?: []
}