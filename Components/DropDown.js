import { Fragment, useContext } from 'react'
import { Menu, Transition } from '@headlessui/react'
import UserProfile from '../Icons/UserProfile'
import AuthContext from '../Context/AuthProvider/AuthContext'
import Link from 'next/link'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDown () {
  const { user, setUser } = useContext(AuthContext)
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700  focus:outline-none">
            <UserProfile className="w-8 h-8 cursor-pointer"/>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Ingresó como</p>
            <p className="truncate text-sm font-medium text-gray-900">{user.email}</p>
          </div>
          {user?.role === 'ADMIN' && (
            <div className='divide-y py-2 px-4'>
              <p className='text-sm font-medium'>Panel <Link href='/dashboard'><a><strong className='underline-offset-4 hover:underline cursor-pointer'>Admin</strong></a></Link></p>
            </div>
          )}
          <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                    onClick={() => {
                      localStorage.removeItem('user')
                      setUser({})
                    }}
                  >
                    Cerrar sesión
                  </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
