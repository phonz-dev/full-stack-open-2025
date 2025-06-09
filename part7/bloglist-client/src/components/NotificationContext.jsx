import { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIF':
    return action.payload
  case 'REMOVE':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (({ children }) => {
  const [notif, notifDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notif, notifDispatch]} >
      {children}
    </NotificationContext.Provider>
  )
})

export const useNotificationValue = () => {
  const notifAndDispatch = useContext(NotificationContext)
  return notifAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notifAndDispatch = useContext(NotificationContext)
  return notifAndDispatch[1]
}

export default NotificationContext
