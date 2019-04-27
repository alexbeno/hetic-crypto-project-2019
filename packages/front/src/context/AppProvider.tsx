import React, { useState, createContext, ComponentType } from 'react'

interface Crypto {
  id: number
  symbol: string
  name: string
}

interface ContextProps {
  crypto: Crypto
  setCrypto: (crypto: Crypto) => void
}

interface OwnProps {
  children: ComponentType
}

const initialState = {
  id: 0,
  symbol: '',
  name: '',
}

export const AppContext = createContext<ContextProps>({
  crypto: initialState,
  setCrypto: crypto => {},
})

const AppProvider = ({ children }) => {
  const [cryptoValue, setCryptoValue] = useState(initialState)

  return (
    <AppContext.Provider
      value={{
        crypto: cryptoValue,
        setCrypto: (crypto: Crypto) => setCryptoValue(crypto),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
