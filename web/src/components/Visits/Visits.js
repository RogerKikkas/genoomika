import { navigate, routes } from '@redwoodjs/router'
import { Form, Label, TextField } from '@redwoodjs/forms'

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  const parsedDate = new Date(datetime)
  const month = parsedDate.toLocaleString('default', { month: 'long' })

  return (
    <time dateTime={datetime} title={datetime}>
      {`${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`}
    </time>
  )
}

const VisitsList = ({ visits, count, page, search }) => {
  return (
    <>
      <div className="w-full mt-4 mb-4 flex justify-between items-center">
        <div>
          <button
            type="button"
            className={`py-2 px-4 rounded-sm text-white text-2xl ${
              page == 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400'
            }`}
            disabled={page == 1}
            onClick={() =>
              navigate(routes.visits({ page: parseInt(page, 10) - 1, search }))
            }
          >{`<`}</button>
          <button
            type="button"
            className={`ml-4 py-2 px-4 rounded-sm text-white text-2xl ${
              count <= page * 50
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-400'
            }`}
            disabled={count <= page * 50}
            onClick={() =>
              navigate(routes.visits({ page: parseInt(page, 10) + 1, search }))
            }
          >{`>`}</button>
        </div>
        <div>
          <Form
            onSubmit={(e) => {
              navigate(
                routes.visits({ search: e.search, page: parseInt(page, 10) })
              )
            }}
          >
            <Label htmlFor="search">Search ID Code: </Label>
            <TextField
              type="text"
              name="search"
              placeholder="Search..."
              className="border-2 b-color-gray rounded-sm"
              defaultValue={search}
            />
          </Form>
        </div>
      </div>
      <div className="rw-segment rw-table-wrapper-responsive">
        <table className="rw-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Visit time</th>
              <th>Email</th>
              <th>Id code</th>
              <th>Date of birth</th>
              <th>Sex</th>
              <th>Age at time of visit</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id}>
                <td>{truncate(visit.department)}</td>
                <td>{truncate(visit.firstName)}</td>
                <td>{truncate(visit.lastName)}</td>
                <td>{timeTag(visit.visitTime)}</td>
                <td>{truncate(visit.email)}</td>
                <td>{truncate(visit.idCode)}</td>
                <td>{timeTag(visit.dateOfBirth)}</td>
                <td>{truncate(visit.sex)}</td>
                <td>{truncate(visit.age)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default VisitsList
