import MainLayout from 'src/layouts/MainLayout'
import VisitsCell from 'src/components/VisitsCell'

const UsersPage = ({ page = 1, search = '' }) => {
  return (
    <MainLayout>
      <div className="min-h-screen p-2 flex flex-col">
        <h1 className="text-xl text-gray-800 font-medium">Visits</h1>
        <div>
          <VisitsCell page={page} search={search} />
        </div>
      </div>
    </MainLayout>
  )
}

export default UsersPage
