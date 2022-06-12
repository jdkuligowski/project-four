import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

// const setStateToLocalStorage = (token) => {
//   window.localStorage.setItem('ski-selector-state', JSON.stringify(resorts))
// }

const SkiSelectorList = () => {

  const [resorts, setResorts] = useState([])


  useEffect(() => {
    const data = window.localStorage.getItem('ski-selector-state')
    if (data !== null) setResorts(JSON.parse(data))
  }, [])

  return (
    <div className='resort-ranked'>
      {resorts.map(resort => {
        return (
          <div className='resort-list' key={resort.id}>
            <h1>{resort.sub_resort} - {resort.calculations}</h1>
          </div>
        )
      })}
    </div>
  )

}


export default SkiSelectorList