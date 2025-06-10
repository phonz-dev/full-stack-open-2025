import { createContext, useContext, useReducer } from 'react'


const usersReducer = (state, action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.payload
  default:
    return state
  }
}

const UsersContext = createContext()

export const UsersContextProvider = (({ children }) => {
  const [users, usersDispatch] = useReducer(usersReducer, null)

  return (
    <UsersContext.Provider value={[users, usersDispatch]}>
      {children}
    </UsersContext.Provider>
  )
})

export const useUsersValue = () => {
  const usersAndDispatch = useContext(UsersContext)
  return usersAndDispatch[0]
}

export const useUsersDispatch = () => {
  const usersAndDispatch = useContext(UsersContext)
  return usersAndDispatch[1]
}

export default UsersContext
