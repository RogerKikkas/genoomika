import UserLayout from 'src/layouts/UserLayout'
import EditUserCell from 'src/components/EditUserCell'

const EditUserPage = ({ id }) => {
  return (
    <UserLayout>
      <EditUserCell id={id} />
    </UserLayout>
  )
}

export default EditUserPage
