import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Layout from './components/Layout'
import AppProvider from './context/AppProvider'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

ReactDOM.render(
  <AppProvider>
    <ApolloProvider client={client}>
      <Layout />
    </ApolloProvider>
  </AppProvider>,
  document.getElementById('root'),
)
