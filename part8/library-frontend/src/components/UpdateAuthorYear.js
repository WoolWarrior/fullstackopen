import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_YEAR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const UpdateAuthorYear = ({ setError, authors }) => {
  const [year, setYear] = useState('1980')
  const [selectedOption, setSelectedOption] = useState({value:'',label:''})

  const options = authors.map(author => {
    const item = {value: author.id, label: author.name}
    return item
  })

  const [ updateYear ] = useMutation(UPDATE_YEAR, {
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    },
    refetchQueries: [ { query: ALL_AUTHORS } ],
  })

  const submit = async (event) => {
    event.preventDefault()

    const yearNumber = Number(year)

    updateYear({ variables: { id: selectedOption.value, setBornTo: yearNumber } })

    setSelectedOption(null)
    setYear('1980')
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
      />
        </div>
        <div>
          born year
          <input
            value={year}
            type="number"
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>Update Author</button>
      </form>
    </div>
  );
};

export default UpdateAuthorYear;