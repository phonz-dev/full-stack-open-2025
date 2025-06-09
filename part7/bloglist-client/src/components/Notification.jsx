import { useSelector } from 'react-redux'
import { useNotificationValue, useNotificationDispatch } from './NotificationContext'

const Notification = () => {
  // const notif = useSelector(({ notification }) => notification)
  const notif = useNotificationValue()
  const notifDispatch = useNotificationDispatch()

  if (!notif) return null

  const { message, isError, seconds } = notif

  setTimeout(() => {
    notifDispatch({ type: 'REMOVE' })
  }, seconds * 1000)

  return (
    <div className={`notification ${isError ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

export default Notification
