import { db } from 'src/lib/db'

export const userRoles = () => {
  return db.userRole.findMany()
}

export const createUserRole = ({ input }) => {
  return db.userRole.create({ data: input })
}

export const deleteUserUserRoles = async ({ userId }) => {
  try {
    const test = await db.userRole.deleteMany({ where: { userId } })
    test.id = 1 // Couldn't figure out how to return id with deleteMany
    return test
  } catch {
    //
  }
}

export const UserRole = {
  user: (_obj, { root }) =>
    db.userRole.findUnique({ where: { id: root.id } }).user(),
}
