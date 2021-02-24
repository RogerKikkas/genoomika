import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import UserForm from 'src/components/UserForm'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

const CREATE_USERROLE_MUTATION = gql`
  mutation CreateUserRoleMutation($input: CreateUserRoleInput!) {
    createUserRole(input: $input) {
      id
    }
  }
`

const NewUser = () => {
  const { addMessage } = useFlash()
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      navigate(routes.users())
      addMessage('User created.', { classes: 'rw-flash-success' })
    },
  })

  const [createUserRole] = useMutation(CREATE_USERROLE_MUTATION)

  const onSave = (input) => {
    const { userRoles } = input
    delete input.userRoles

    createUser({ variables: { input } }).then(function (data) {
      userRoles.forEach((userRole) => {
        createUserRole({
          variables: {
            input: {
              name: userRole,
              userId: data.data.createUser.id,
            },
          },
        })
      })
    })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New User</h2>
      </header>
      <div className="rw-segment-main">
        <UserForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUser
