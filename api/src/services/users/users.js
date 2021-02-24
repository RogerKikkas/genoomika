import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const users = () => {
  requireAuth({ role: 'manage' })
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  requireAuth({ role: 'manage' })
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
