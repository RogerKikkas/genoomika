import Menu from 'src/components/Menu'

const MainLayout = ({ children }) => {
  return (
    <div className="rw-scaffold min-h-screen flex flex-row">
      <Menu />
      <div className="bg-blue-200 w-4/5">
        <main className="rw-main">{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
