import { useMutation, useFlash } from '@redwoodjs/web'
import { Form, FileField, Submit } from '@redwoodjs/forms'
import { useState } from 'react'

const CREATE_VISITS_MUTATION = gql`
  mutation CreateVisitsMutation($input: [CreateVisitInput]!) {
    createVisits(input: $input) {
      id
    }
  }
`

const UploadFile = () => {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [inputKey, setInputKey] = useState('')
  const { addMessage } = useFlash()
  const [createVisits] = useMutation(CREATE_VISITS_MUTATION)
  const indexes = []
  let fileReader

  const handleFileRead = () => {
    setContent(fileReader.result)
    setLoading(false)
  }

  const handleFileChosen = (file) => {
    if (!file) return false
    fileReader = new FileReader()
    fileReader.onloadstart = setLoading(true)
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  const onSubmit = async () => {
    setLoading(true)
    const data = content.split('\n')
    const firstLine = data.shift().split(';')
    let visits = []
    let errored = false

    firstLine.forEach((val) => {
      if (val === 'dep') {
        indexes.push('department')
      } else if (val.substr(0, 5) === 'first') {
        indexes.push('firstName')
      } else if (val.substr(0, 4) === 'last') {
        indexes.push('lastName')
      } else if (val === 'visit_time') {
        indexes.push('visitTime')
      } else if (val === 'id_code' || val === 'isikukood') {
        indexes.push('idCode')
      } else {
        indexes.push(val)
      }
    })

    let limit = 0

    for (let i = 0; i < data.length; i++) {
      const line = data[i]
      if (line) {
        // Initalize empty input object
        const input = {}
        const lineArray = line.split(';')

        // Add values to input object
        for (let j = 0; j < lineArray.length; j++) {
          input[indexes[j]] = lineArray[j]
        }

        // Change visit time to date
        input.visitTime = new Date(input.visitTime)

        // Get values from id code
        const { idCode } = input
        const firstNumber = idCode[0]
        let yearPrepend = ''

        if (firstNumber <= 2) yearPrepend = '18'
        else if (firstNumber <= 4) yearPrepend = '19'
        else if (firstNumber <= 6) yearPrepend = '20'

        input.sex = firstNumber % 2 ? 'M' : 'F'
        input.dateOfBirth = new Date(
          `${yearPrepend}${idCode.substr(1, 2)}`,
          idCode.substr(3, 2) - 1,
          idCode.substr(5, 2)
        )

        // Calculate age
        const ageDifms = Date.now() - input.dateOfBirth.getTime()
        const ageDate = new Date(ageDifms)
        input.age = Math.abs(ageDate.getUTCFullYear() - 1970)

        limit++
        visits.push(input)
      }

      // Couldn't increase request size so now send requests with 300 visits at a time
      // Or when it's the last row
      if (limit >= 300 || i === data.length - 1) {
        try {
          await createVisits({ variables: { input: visits } })
        } catch (err) {
          // If error is related to unique constraint then ignore
          // otherwise stop execution and alert the user
          if (!err.message.includes('Unique constraint failed')) {
            addMessage(err.message, { classes: 'rw-flash-error' })
            errored = true
            break
          }
        }

        limit = 0
        visits = []
      }
    }

    if (!errored) {
      addMessage('File data successfully inserted!', {
        classes: 'rw-flash-success',
      })
      setContent('')
      // Make react rerender file input field again
      setInputKey(Date.now())
    }

    setLoading(false)
  }

  return (
    <div>
      <h1>Upload a file</h1>
      <Form onSubmit={onSubmit}>
        <FileField
          name="file"
          className="rw-input"
          key={inputKey}
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />

        {loading && <p>Loading...</p>}
        <div className="rw-button-group">
          <Submit
            disabled={loading || !content}
            className={`flex flex-row text-white rounded my-2 py-2 px-4 w-max ${
              loading || !content
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            Submit
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UploadFile
