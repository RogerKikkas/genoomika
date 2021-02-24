import { navigate, routes } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout'
import UsersCell from 'src/components/UsersCell'

const UsersPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen p-2 flex flex-col">
        <h1 className="text-xl text-gray-800 font-medium">Users</h1>
        <button
          type="button"
          className="bg-green-400 hover:bg-green-500 text-white rounded-sm my-2 py-2 px-4 w-max"
          onClick={() => navigate(routes.newUser())}
        >
          New user
        </button>
        <div>
          <UsersCell />
        </div>
      </div>
    </MainLayout>
  )
}

export default UsersPage
