import instance from "@/app/components/common/configs/axios-configs"

export const findAllBoardsAPI = async (page:number) => {
    try {
        return (await instance.get('/boards/list', {
            params: {page, size: 10, limit: 10}
        })).data
    } catch (error) {
        return error
    }
}

export const findBoardByIdAPI = async (id:number) => {
    try{
        return (await instance.get('/boards/find',{
            params:{id}
        })).data
    }
    catch(error){
        return error
    }
}

export const countBoardsAPI = async () => {
    try{
        return (await instance.get('/boards/count')).data
    }
    catch(error){
        return error
    }
}