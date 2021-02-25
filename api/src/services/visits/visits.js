import { UserInputError } from '@redwoodjs/api'
import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

const VISITS_PER_PAGE = 50

const validate = (input) => {
  if (input.email && !input.email.match(/[^@]+@[^.]+\..+/)) {
    throw new UserInputError("Can't create new visit", {
      messages: {
        email: ['is not formatted like an email address'],
      },
    })
  }
}

export const visits = () => {
  return db.visit.findMany()
}

export const visitPage = ({ page = 1, search = '' }) => {
  const offset = (page - 1) * VISITS_PER_PAGE
  const where = search ? { idCode: { startsWith: search } } : {}

  return {
    visits: db.visit.findMany({
      where,
      take: VISITS_PER_PAGE,
      skip: offset,
      orderBy: { id: 'asc' },
    }),
    count: db.visit.count({ where }),
  }
}

export const createVisit = ({ input }) => {
  requireAuth({ role: 'upload' })
  validate(input)

  return db.visit.create({ data: input })
}

export const createVisits = async ({ input: inputs }) => {
  requireAuth({ role: 'upload' })
  let visit

  // Couldn't get createMany to work so had to loop through inputs
  // and insert them one by one
  // https://github.com/redwoodjs/redwood/issues/1771
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i]
    validate(input)
    try {
      visit = await db.visit.create({ data: input })
    } catch (err) {
      // If error is related to unique constraint then ignore
      // otherwise stop execution and alert the user
      if (!err.message.includes('Unique constraint failed')) {
        throw Error(err)
      }
    }
  }

  return visit
  // return db.visit.createMany({ data: input, skipDuplicates: true })
}
