//Entity와 같은 거라고 생각
//.ts는 TypeScript 문법

export interface UserColumn{
    id? : number,
    username? : string,
    password? : string,
    email? : string,
    phone? : string,
    name? : string,
    job? : string,
    json? : {},
    array? : []
}