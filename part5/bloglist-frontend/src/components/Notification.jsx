const Notification = ({ message, error }) => {
  if (message === null) return null

  return (
    <div className={`notification ${error ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

export default Notification
