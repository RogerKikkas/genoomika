import Users from 'src/components/Users'

export const QUERY = gql`
  query UsersQuery {
    users {
      id
      email
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ users }) => {
  return <Users users={users} />
}
