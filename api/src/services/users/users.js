import { UserInputError } from '@redwoodjs/api'
import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'
import bcrypt from 'bcryptjs'

const validate = (input) => {
  if (input.email && !input.email.match(/[^@]+@[^.]+\..+/)) {
    throw new UserInputError("Can't create new user", {
      messages: {
        email: ['is not formatted like an email address'],
      },
    })
  }
}

export const users = () => {
  requireAuth({ role: 'manage' })
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
    include: { userRoles: true },
  })
}

export const createUser = async ({ input }) => {
  requireAuth({ role: 'manage' })
  validate(input)

  input.password = await bcrypt.hash(input.password, 12)

  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  requireAuth({ role: 'manage' })
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  requireAuth({ role: 'manage' })
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  userRoles: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).userRoles(),
}
