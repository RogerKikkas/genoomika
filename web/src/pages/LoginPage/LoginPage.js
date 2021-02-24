import { useAuth } from '@redwoodjs/auth'
import { Redirect, routes } from '@redwoodjs/router'

import LoginForm from 'src/components/LoginForm'

const LoginPage = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) return <Redirect to={routes.home()} />

  return (
    <div className="min-h-screen bg-blue-100 py-6 flex flex-col justify-center items-center">
      <div className="p-4 bg-white rounded-sm max-w-xl w-96">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
