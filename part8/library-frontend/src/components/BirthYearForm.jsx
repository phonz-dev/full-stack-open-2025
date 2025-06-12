import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, updateYearBornMutation } from "../queries"


const BirthYearForm = () => {
  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const authorsResult = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(updateYearBornMutation, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {
    setSelectedAuthor(authorsResult.data.allAuthors.map(({ name }) => name)[0])
  }, [authorsResult.data])

  if (authorsResult.loading) {
    return <div>loading authors...</div>
  }

  const authors = authorsResult.data.allAuthors.map(({ name }) => name)

  const handleSubmit = event => {
    event.preventDefault()
    updateAuthor({ variables: { name: selectedAuthor, setBornTo: Number(born) } })
    setBorn('')
  }

  return (
    <>
      <h2>set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedAuthor}
          onChange={({ target }) => setSelectedAuthor(target.value)}
        >
          {authors.map(author =>
            <option value={author} key={author}>{author}</option>
          )}
        </select>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default BirthYearForm
