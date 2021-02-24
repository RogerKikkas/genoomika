import { Flash } from '@redwoodjs/web'
import Menu from 'src/components/Menu'

const MainLayout = ({ children }) => {
  return (
    <div className="rw-scaffold min-h-screen flex flex-row">
      <Menu />
      <div className="w-4/5">
        <Flash timeout={3000} className="mt-2" />
        <main className="rw-main">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
