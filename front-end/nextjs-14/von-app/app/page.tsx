'use client'

import { useEffect, useState } from "react"
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { existsUsername, login } from "./components/users/service/user-service";
import { IUser } from "./components/users/model/user-model";
import { getLoginResult, getUsernameResult } from "./components/users/service/user-slice";
import { parseCookies, setCookie } from "nookies";
import { jwtDecode } from "jwt-decode";

export default function Home() {

  const router = useRouter();

  const dispatch = useDispatch()
  const result = useSelector(getLoginResult)

  const [isWrongId, setIsWrongId] = useState(false)
  const [isWrongPW, setIsWrongPW] = useState(false)

  const userNameResult  = useSelector(getUsernameResult)

  const [user, setUser] = useState({} as IUser)
  
  const handleId = (e: any) => {
    const ID_CHECK = /^[a-z][a-zA-Z]{3,19}$/g;
    // 영어 소문자로 시작하는 4~20자의 영어 소문자 또는 숫자
    if(ID_CHECK.test(e.target.value)){
      setIsWrongId(false)
      setUser({
        ...user,
        username: e.target.value
      })
    }
    else{
      setIsWrongId(true)
    }
    
  }

  const handlePW = (e: any) => {
    const PW_CHECK = /^[\w!@#$%^&*()-+=~`{}[\]:;'",.<>? ]{3,16}$/g;
    // 최소 3 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
    if(PW_CHECK.test(e.target.value)){
      setIsWrongPW(false)
    }else{
      setIsWrongPW(true)
    }
    setUser({
      ...user,
      password: e.target.value
    })
  }

  const handleSubmit = () => {
    console.log('page user ' + JSON.stringify(user))
    dispatch(existsUsername(user.username))
    console.log('아이디 유무 확인 '+userNameResult)
    // dispatch(login(user))
  }

  useEffect(() => {
    if (result.message === "SUCCESS") {
      setCookie({}, 'message', result.message, { httpOnly: false, path: '/' })
      setCookie({}, 'token', result.token, { httpOnly: false, path: '/' })
      console.log('서버에서 넘어온 메시지 ' + parseCookies().message)
      console.log('서버에서 넘어온 토큰 ' + parseCookies().token)
      console.log(jwtDecode<any>(parseCookies().token))
      jwtDecode<any>(parseCookies().token)?.username
      // router.push('/pages/board/list')
    } else {
      console.log('로그인 실패')
    }
  }, [result]) // []가 비어있으면 useEffect가 한 번만 실행됨.


  
  return (
    <div className='text-center'>
      <div className="flex items-center justify-center w-full px-5 sm:px-0">
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required onChange={handleId}
              />
            </div>

            {!isWrongId && (user.username) !== undefined  && (<pre>
              <h6 className="text-blue-600">
                사용가능한 아이디 입니다. 
              </h6>
            </pre>)}

            {isWrongId && (user.username) !== undefined && (<pre>
              <h6 className="text-red-600">
                잘못된 아이디 입니다. 
              </h6>
            </pre>)}

            {userNameResult && userNameResult.message==='FAILURE' && (<pre>
              <h6 className="text-red-600">
                존재하지 않는 아이디 입니다. 
              </h6>
            </pre>)}

            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password" onChange={handlePW}
              />
              {isWrongPW && (<pre>
              <h6 className="text-red-600">
                잘못된 비밀번호 입니다. 
              </h6>
            </pre>)}
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              >
                Forget Password?
              </a>
            </div>
            <div className="mt-8">
              <button onClick={handleSubmit} className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Login
              </button>
            </div>
            <a
              href="#"
              className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex px-5 justify-center w-full py-3">
                <div className="min-w-[30px]">
                  <svg className="h-6 w-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <div className="flex w-full justify-center">
                  <h1 className="whitespace-nowrap text-gray-600 font-bold">
                    Sign in with Google
                  </h1>
                </div>
              </div>
            </a>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                href="/pages/user/join"
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div><br /><br />
      
    </div>
  );
}
