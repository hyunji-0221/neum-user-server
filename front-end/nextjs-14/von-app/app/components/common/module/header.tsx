'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LinkButton, { linkButtonTitles } from '@/app/atoms/button/LinkButton';
import { destroyCookie, parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';
import { logout } from '../../users/service/user-service';
import { useRouter } from 'next/navigation';



const pages = ['카운터', '게시판목록', '게시글목록', '사용자목록'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {

  const router = useRouter()
  const dispatch = useDispatch()
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    if (parseCookies().accessToken) {
      setShowProfile(true)
    } else {
      setShowProfile(false)
    }
  }, [parseCookies().accessToken])

  const logoutHandler = () => {
    console.log('로그아웃 적용 전' + parseCookies().accessToken)
    dispatch(logout())
      .then((res: any) => {
        destroyCookie(null,'accessToken')
        setShowProfile(false)
        router.push('/')
        router.refresh()
      })
      .catch((err: any) => {
        console.log('로그아웃 실행에서 에러가 발생함 : '+err)
      })
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
        </Link>

        {!showProfile && <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src="/img/user/userDefaultImg.png" alt="user photo" />
        </button>}

        {showProfile &&
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            <span 
            onClick={logoutHandler}
            className="block text-sm  text-gray-500 truncate dark:text-gray-400"><a href='#neu'> Log out </a></span>
          </div>
        }

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

            {linkButtonTitles.map((elem) => (
              <li key={elem.id}>
                <LinkButton id={elem.id} title={elem.title} path={elem.path} />
              </li>
            ))}

          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;