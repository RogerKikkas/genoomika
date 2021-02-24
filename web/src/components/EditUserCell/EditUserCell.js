import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import UserForm from 'src/components/UserForm'

export const QUERY = gql`
  query FIND_USER_BY_ID($id: Int!) {
    user: user(id: $id) {
      id
      email
      password
      refreshToken
      createdAt
      userRoles {
        name
      }
    }
  }
`
const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      password
      refreshToken
      createdAt
    }
  }
`

const DELETE_USER_USER_ROLES = gql`
  mutation DeleteUserUserRoles($userId: Int!) {
    deleteUserUserRoles(userId: $userId) {
      id
    }
  }
`

const CREATE_USER_ROLE_MUTATION = gql`
  mutation CreateUserRoleMutation($input: CreateUserRoleInput!) {
    createUserRole(input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ user }) => {
  const { addMessage } = useFlash()
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      navigate(routes.users())
      addMessage('User updated.', { classes: 'rw-flash-success' })
    },
  })
  const [deleteUserUserRoles] = useMutation(DELETE_USER_USER_ROLES)
  const [createUserRole] = useMutation(CREATE_USER_ROLE_MUTATION)

  const onSave = (input, id) => {
    const { userRoles } = input
    delete input.userRoles

    updateUser({ variables: { id, input } })
    deleteUserUserRoles({ variables: { userId: id } })

    userRoles.forEach((userRole) => {
      createUserRole({
        variables: {
          input: {
            name: userRole,
            userId: id,
          },
        },
      })
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit User {user.id}</h2>
      </header>
      <div className="rw-segment-main">
        <UserForm user={user} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
