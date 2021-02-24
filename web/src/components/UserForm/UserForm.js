import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'

import { useAuth } from '@redwoodjs/auth'

const UserForm = (props) => {
  const { currentUser } = useAuth()
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
  }
  const roles = []
  props?.user?.userRoles?.forEach((role) => roles.push(role.name))

  return (
    <div className="rw-form-wrapper">
      <Form
        onSubmit={onSubmit}
        error={props.error}
        validation={{ mode: 'onBlur' }}
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
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
          disabled={!!props.user}
        />
        <FieldError name="email" className="rw-field-error" />

        {!props.user && (
          <>
            <Label
              name="password"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Password
            </Label>
            <TextField
              name="password"
              defaultValue={props.user?.password}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            />
            <FieldError name="password" className="rw-field-error" />
          </>
        )}

        <Label
          name="userRoles"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Roles
        </Label>
        <SelectField
          name="userRoles"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          defaultValue={roles}
          multiple
          disabled={props?.user?.id && props?.user?.id === currentUser.id}
        >
          <option value="view">View results</option>
          <option value="upload">Upload files</option>
          <option value="manage">Manage users</option>
        </SelectField>
        <FieldError name="userRoles" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
