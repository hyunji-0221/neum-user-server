import axios from 'axios'
import { parseCookies } from 'nookies'


// export default function AxiosConfig(){
//     return {
//         headers: {
//             "Cache-Control": "no-cache",
//             "Content-Type": "application/json",
//             Authorization: `Bearer blah ~`,
//             "Access-Control-Allow-Origin": "*",
//         }
//     }
// }


const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })

instance.interceptors.request.use(
    (config)=>{
        const accessToken = parseCookies().accessToken
        console.log('Axios interceptor에서 쿠키에서 토큰을 추출함')
        config.headers['Content-Type'] = "application/json"
        config.headers['Authorization'] = `Bearer ${accessToken}`
        return config
    },
    (error)=>{
        console.log('Axois interceptor 에서 발생된 error '+error)
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response)=>{
        if(response.status === 404){
            console.log('Axios interceptor respose에서 발생한 404 error / 토큰이 없어서 404로 넘어감')
        }
        return response
    }
)

export default instance