import PropTypes from 'prop-types'
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

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notifAndDispatch = useContext(NotificationContext)
  return notifAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notifAndDispatch = useContext(NotificationContext)
  return notifAndDispatch[1]
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NotificationContext
