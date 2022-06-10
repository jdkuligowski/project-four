import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'


const SkiSelector = () => {

  const navigate = useNavigate()


  const [errors, setErrors] = useState(false)

  const [totalPoints, setTotalPoints] = useState(100)
  const [locationValue, setLocationValue] = useState(0)
  const [pisteValue, setPisteValue] = useState(0)
  const [offPisteValue, setOffPisteValue] = useState(0)
  const [breadthValue, setBreadthValue] = useState(0)
  const [lunchValue, setLunchValue] = useState(0)

  let newValue

  const { id } = useParams()

  const [resorts, setResorts] = useState([])



  useEffect(() => {
    const getResorts = async () => {
      try {
        const { data } = await axios.get(`/api/resorts/${id}`)
        setResorts(data.mountain_detail)
        console.log(data.mountain_detail)
      } catch (error) {
        setErrors(true)
      }
    }
    getResorts()
  }, [])






  const handleLocation = (e) => {
    if (newValue <= 0) {
      e.preventDefault()
    }
    setLocationValue(e.target.value)
  }

  const handlePiste = (e) => {
    setPisteValue(e.target.value)
  }

  const handleOffPiste = (e) => {
    setOffPisteValue(e.target.value)
  }

  const handleBreadth = (e) => {
    setBreadthValue(e.target.value)
  }

  const handleLunch = (e) => {
    setLunchValue(e.target.value)
  }


  const totalFilter = (e) => {
    if (newValue <= 0) {
      e.preventDefault()
    } else if (locationValue || pisteValue || offPisteValue || breadthValue || lunchValue) {
      const newValue = 100 - locationValue - pisteValue - offPisteValue - breadthValue - lunchValue
      console.log(newValue)
      return newValue
    }
    return 100
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    calculation()
    // navigate(`/resorts/${id}/overview`)
  }


  const calculation = () => {
    const calculation = resorts.map(resort => {
      // const calculation = (locationValue * resort.location_score) + (pisteValue * resort.piste_score) + (offPisteValue * resort.off_piste_score)  + (breadthValue * resort.breadth_score)  + (lunchValue * resort.lunch_score) 
      // console.log(calculation)
      return {
        ...resort, calculations: (locationValue * resort.location_score) + (pisteValue * resort.piste_score) + (offPisteValue * resort.off_piste_score) + (breadthValue * resort.breadth_score) + (lunchValue * resort.lunch_score),
        percentages: parseFloat(((locationValue * resort.location_score) + (pisteValue * resort.piste_score) + (offPisteValue * resort.off_piste_score) + (breadthValue * resort.breadth_score) + (lunchValue * resort.lunch_score)) / 500).toFixed(3),
      }

    }).sort((a, b) => b.calculations - a.calculations)
    console.log('new array ->', calculation)
    setResorts(calculation)
  }

  // calculation()


  return (
    <>
      <section className='form-page'>
        <h1>Ski selector tool</h1>
        <form className='form-detail'>
          <h3>Points to allocate: {totalFilter()}</h3>

          <hr />
          {/* Location */}
          <label htmlFor='location'></label>
          <div className='form-sections'>
            <div className='form-keys'>
              <h4>Location</h4>
            </div>
            <input type='number' name='location' className='input' onChange={handleLocation} />
          </div>
          {/* Piste */}
          <label htmlFor='piste'></label>
          <div className='form-sections'>
            <div className='form-keys'>
              <h4>Piste</h4>
            </div>
            <input type='number' name='piste' className='input' onChange={handlePiste} />
          </div>
          {/* Off Piste */}
          <label htmlFor='off-piste'></label>
          <div className='form-sections'>
            <div className='form-keys'>
              <h4>Off-piste</h4>
            </div>
            <input type='number' name='off-piste' className='input' onChange={handleOffPiste} />
          </div>
          {/* Breadth */}
          <label htmlFor='breadth'></label>
          <div className='form-sections'>
            <div className='form-keys'>
              <h4>Breadth</h4>
            </div>
            <input type='number' name='breadth' className='input' onChange={handleBreadth} />
          </div>
          {/* Lunch */}
          <label htmlFor='lunch'></label>
          <div className='form-sections'>
            <div className='form-keys'>
              <h4>Lunch</h4>
            </div>
            <input type='number' name='lunch' className='input' onChange={handleLunch} />
          </div>
          {/* {errors && <p className='denied-text'>Please enter the correct login details</p>} */}
          {/* Submit */}
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </section>
      <section className='ranked-resorts'>
        {!resorts ?
          <h2>{errors ? 'Sorry something went wrong with the connection, try reloading' : ''}</h2>
          :
          <div className='resort-ranked'>
            {resorts.map(resort => {
              return (
                <div className='resort-list' key={resort.id}>
                  <h1>{resort.sub_resort} - {resort.calculations}</h1>
                </div>
              )
            })}
          </div>
        }
      </section>
    </>
  )


}

export default SkiSelector