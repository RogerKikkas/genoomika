import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useState } from 'react'

const LoginForm = (props) => {
  const { logIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = (data) => {
    setLoading(true)
    logIn(data)
      .then(() => navigate(routes.home()))
      .catch((err) => {
        const message = err.response.data?.errors[0]?.message
        setError({
          graphQLErrors: [
            {
              message,
              extensions: { exception: {} },
            },
          ],
        })
        setLoading(false)
      })
  }

  return (
    <div className="rw-form-wrapper flex-row justify-center items-center text-center">
      <h1 className="font-semibold text-lg mt-4">Please log in</h1>
      <Form
        className="flex flex-col items-start"
        onSubmit={onSubmit}
        error={error}
        validation={{ mode: 'onBlur' }}
      >
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper w-full"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        <TextField
          name="email"
          defaultValue={props.user?.email}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
          placeholder="test@test.com"
        />
        <FieldError name="email" className="rw-field-error" />

        <Label
          name="password"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Password
        </Label>
        <TextField
          name="password"
          type="password"
          defaultValue={props.user?.password}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          placeholder="password"
        />
        <FieldError name="password" className="rw-field-error" />

        <Submit disabled={loading} className="rw-button rw-button-blue mt-4">
          Login
        </Submit>
      </Form>
    </div>
  )
}

export default LoginForm
