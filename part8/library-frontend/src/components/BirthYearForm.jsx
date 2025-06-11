import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, updateYearBornMutation } from "../queries"

const BirthYearForm = () => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [updateAuthor] = useMutation(updateYearBornMutation, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handleSubmit = event => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  return (
    <>
      <h2>set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>name <input type="text" value={name} onChange={({ target }) => setName(target.value)}  /></div>
        <div>born <input type="text" value={born} onChange={({ target }) => setBorn(target.value)} /></div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default BirthYearForm
