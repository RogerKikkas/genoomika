import { db } from 'src/lib/db'

export const userRoles = () => {
  return db.userRole.findMany()
}

export const UserRole = {
  user: (_obj, { root }) =>
    db.userRole.findUnique({ where: { id: root.id } }).user(),
}
