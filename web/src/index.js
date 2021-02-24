import { AuthProvider } from '@redwoodjs/auth'
import ReactDOM from 'react-dom'

import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import { AuthMiddleware, JWTAuthClient } from 'src/jwtAuthClient'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={JWTAuthClient} type="custom">
      <RedwoodApolloProvider graphQLClientConfig={AuthMiddleware()}>
        <Routes />
      </RedwoodApolloProvider>
    </AuthProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
