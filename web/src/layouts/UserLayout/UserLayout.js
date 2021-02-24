import { Link, routes } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout'

const UserLayout = ({ children }) => {
  return (
    <MainLayout>
      <div className="flex flex-col mt-2">
        <Link
          className="m-2 text-blue-500 hover:text-blue-600"
          to={routes.users()}
        >{`<- Back to users list`}</Link>
        <main>{children}</main>
      </div>
    </MainLayout>
  )
}

export default UserLayout
