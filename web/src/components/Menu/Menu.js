import { useAuth } from '@redwoodjs/auth'

import MenuLink from 'src/components/MenuLink'

const Menu = () => {
  const { currentUser, logOut, hasRole } = useAuth()

  return (
    <div className="w-1/5 flex flex-col">
      <div className="bg-gray-300 p-2">
        <p>{currentUser.email}</p>
        <button
          type="button"
          className="bg-red-500 text-white rounded-sm py-2 px-4"
          onClick={logOut}
        >
          Log out
        </button>
      </div>
      <div className="flex-grow p-2">
        {hasRole('view') && <MenuLink route="home">View results</MenuLink>}
        {hasRole('upload') && <MenuLink route="home">Upload files</MenuLink>}
        {hasRole('manage') && <MenuLink route="home">Manage users</MenuLink>}
      </div>
    </div>
  )
}

export default Menu
