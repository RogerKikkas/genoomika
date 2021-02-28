import { useMutation, useFlash } from '@redwoodjs/web'
import { Form, FileField } from '@redwoodjs/forms'
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
  const [inputKey, setInputKey] = useState('')
  const { addMessage } = useFlash()
  const [createVisits] = useMutation(CREATE_VISITS_MUTATION)
  const textDecoder = new TextDecoder('utf-8')
  const CHUNK_SIZE = 10000 * 1024
  let visits = []
  let file
  let fileReader
  let indexes = []
  let start = 0
  let stop = false
  let limit = 0
  let lastLine = ''

  const handleFileChosen = (newFile) => {
    if (!newFile) return false
    stop = false
    file = newFile
    fileReader = new FileReader()
    fileReader.onloadstart = setLoading(true)
    fileReader.onload = handleFileLoad

    seek()
  }

  const handleFileLoad = async () => {
    const buffer = new Uint8Array(fileReader.result)
    const content2 = lastLine + textDecoder.decode(buffer.slice())
    const data = content2.split('\n')

    // If new file and indexes have not been set
    if (!indexes.length) {
      const firstLine = data.shift().split(';')

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
    }

    for (let i = 0; i < data.length; i++) {
      if (stop) break
      const line = data[i]
      // If it's the last row then save it as a string to continue on in next cycle
      if (i === data.length - 1) {
        lastLine = line
        break
      }

      if (!line) break

      await addVisit(line)

      limit++

      if (limit >= 300) {
        limit = 0
        await insertVisits()
      }
    }

    seek()
  }

  const seek = async () => {
    if (stop) return false
    // End process when the whole file is processed
    if (start > file.size) {
      // If the last line is not added to visits
      if (lastLine) addVisit(lastLine)
      // If there are any more visits that have not been inserted
      if (visits.length) await insertVisits()

      if (!stop)
        addMessage('File data successfully read!', {
          classes: 'rw-flash-success',
        })

      indexes = []
      file = null
      setLoading(false)
      setInputKey(Date.now())
      return false
    }

    const end = start + CHUNK_SIZE
    const slice = file.slice(start, end)

    start += CHUNK_SIZE

    fileReader.readAsArrayBuffer(slice)
  }

  const addVisit = async (visitLine) => {
    // Initalize empty input object
    const input = {}
    const lineArray = visitLine.split(';')

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
    const ageDifms = input.visitTime.getTime() - input.dateOfBirth.getTime()
    const ageDate = new Date(ageDifms)
    input.age = Math.abs(ageDate.getUTCFullYear() - 1970)

    visits.push(input)
  }

  const insertVisits = async () => {
    try {
      await createVisits({ variables: { input: visits } })
    } catch (err) {
      // If error is related to unique constraint then ignore
      // otherwise stop execution and alert the user
      if (!err.message.includes('Unique constraint failed')) {
        addMessage(err.message, { classes: 'rw-flash-error' })
        stop = true
        setLoading(false)
        setInputKey(Date.now())
      }
    }

    visits = []

    return true
  }

  return (
    <div>
      <h1>Upload a file</h1>
      <Form>
        <FileField
          name="file"
          className="rw-input"
          key={inputKey}
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />

        {loading && <p>Loading...</p>}
      </Form>
    </div>
  )
}

export default UploadFile
