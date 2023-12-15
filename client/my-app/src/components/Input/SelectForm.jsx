import React from 'react'
import Select from 'react-select'

function SelectForm({
   id,
   options,
   register,
   defaultValue,
   setSelectedOption,
}) {
   return (
      <Select
         register={{ ...register(id) }}
         defaultValue={defaultValue}
         onChange={setSelectedOption}
         options={options}
      />
   )
}

export default SelectForm
