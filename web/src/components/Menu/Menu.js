import { useAuth } from '@redwoodjs/auth'

import MenuLink from 'src/components/MenuLink'

const Menu = () => {
  const { currentUser, logOut, hasRole } = useAuth()

  return (
    <div className="w-1/5 flex flex-col min-w-min">
      <div className="bg-blue-500 p-2">
        <h2 className="text-lg text-gray-200">{currentUser.email}</h2>
        <button
          type="button"
          className="bg-red-500 text-white rounded-sm py-2 px-4 shadow"
          onClick={logOut}
        >
          Log out
        </button>
      </div>
      <div className="flex-grow p-2 bg-gray-800">
        {hasRole('view') && <MenuLink route="visits">View visits</MenuLink>}
        {hasRole('upload') && <MenuLink route="upload">Upload files</MenuLink>}
        {hasRole('manage') && <MenuLink route="users">Manage users</MenuLink>}
      </div>
    </div>
  )
}

export default Menu
