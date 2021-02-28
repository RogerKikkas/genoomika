import Visits from 'src/components/Visits'

export const QUERY = gql`
  query VisitsQuery($page: Int, $search: String) {
    visitPage(page: $page, search: $search) {
      visits {
        id
        code
        department
        firstName
        lastName
        visitTime
        email
        idCode
        dateOfBirth
        sex
        age
      }
      count
    }
  }
`

export const beforeQuery = ({ page, search }) => {
  page = page ? parseInt(page, 10) : 1

  return {
    variables: { page, search },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = (props) => {
  const { page, search } = props
  const { visits, count } = props.visitPage
  return <Visits visits={visits} count={count} page={page} search={search} />
}
