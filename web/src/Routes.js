// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Private unauthenticated="login">
        <Route path="/" page={HomePage} name="home" />
      </Private>
      <Private unauthenticated="home" role="manage">
        <Route path="/users" page={UsersPage} name="users" />
        <Route path="/users/new" page={NewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={EditUserPage} name="editUser" />
      </Private>
      <Private unauthenticated="home" role="upload">
        <Route path="/upload" page={UploadPage} name="upload" />
      </Private>
      <Private unauthenticated="home" role="view">
        <Route path="/visits" page={VisitsPage} name="visits" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
