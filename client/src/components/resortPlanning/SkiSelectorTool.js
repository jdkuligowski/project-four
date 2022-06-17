import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Select from 'react-select'
import Slider from 'react-input-slider'
import Modal from 'react-bootstrap/Modal'
// import { Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/esm/FormGroup'
import { isUserAuth } from '../auth/Auth'

const SkiSelectorTool = () => {

  const navigate = useNavigate()


  const [errors, setErrors] = useState(false)


  const [formData, setFormData] = useState({
    car: '',
    conditions: '',
    location: '',
    piste: '',
    offPiste: '',
    lunch: '',
  })


  const handleMultiChange = (selected, keyName) => {
    const selectedValues = selected.map(i => i.value)
    setFormData({ ...formData, [keyName]: selectedValues })
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  }

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


  useEffect(() => {
    if (resorts) {
      setStateToLocalStorage()
    }
  }, [resorts])


  const [languages, setLanguagesData] = useState()

  const [languageState, setLanguageState] = useState([])

  const getData = () => {
    window.addEventListener('storage', () => {
      console.log('change to local storage')
      const data = JSON.parse(localStorage.getItem('language-state'))
      console.log('data->', data)
      if (data) setLanguageState(data)
      console.log('current language ->', languageState)
    })
  }

  useEffect(() => {
    getData()
  })




  useEffect(() => {
    const getLanguages = async () => {
      const { data } = await axios.get('/api/language/')
      setLanguagesData(data)
      console.log('language dataset ->', data)
    }
    getLanguages()
  }, [])



  const calculation = () => {
    const calculation =
      resorts.map(resort => {
        if (formData.conditions === 'blue-bird') {
          if (formData.car) {
            return {
              ...resort, percentages: (parseFloat(((formData.location * resort.car_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.blue_bird_score * 20)) / 500) * 100).toFixed(0),
              lunchInput: parseInt(formData.lunch), locationInput: parseInt(formData.location), pisteInput: parseInt(formData.piste), offPisteInput: parseInt(formData.offPiste), carInput: formData.car,
            }
          } else {
            return {
              ...resort, percentages: (parseFloat(((formData.location * resort.bus_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.blue_bird_score * 20)) / 500) * 100).toFixed(0),
              lunchInput: parseInt(formData.lunch), locationInput: parseInt(formData.location), pisteInput: parseInt(formData.piste), offPisteInput: parseInt(formData.offPiste), carInput: formData.car,
            }
          }
        } else if (formData.conditions === 'overcast') {
          if (formData.car) {
            return {
              ...resort, percentages: (parseFloat(((formData.location * resort.car_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.overcast_score * 20)) / 500) * 100).toFixed(0),
              lunchInput: parseInt(formData.lunch), locationInput: parseInt(formData.location), pisteInput: parseInt(formData.piste), offPisteInput: parseInt(formData.offPiste), carInput: formData.car,
            }
          } else {
            return {
              ...resort, percentages: (parseFloat(((formData.location * resort.bus_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.overcast_score * 20)) / 500) * 100).toFixed(0),
              lunchInput: parseInt(formData.lunch), locationInput: parseInt(formData.location), pisteInput: parseInt(formData.piste), offPisteInput: parseInt(formData.offPiste), carInput: formData.car,
            }
          }
        } else if (formData.conditions === 'white-out') {
          if (formData.car) {
            return {
              ...resort, percentages: (parseFloat(((formData.location * resort.car_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.white_out_score * 20)) / 500) * 100).toFixed(0),
              lunchInput: parseInt(formData.lunch), locationInput: parseInt(formData.location), pisteInput: parseInt(formData.piste), offPisteInput: parseInt(formData.offPiste), carInput: formData.car,
            }
          } else {
            return {
              ...resort, percentages: (parseFloat(((formData.location * resort.bus_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.white_out_score * 20)) / 500) * 100).toFixed(0),
              lunchInput: parseInt(formData.lunch), locationInput: parseInt(formData.location), pisteInput: parseInt(formData.piste), offPisteInput: parseInt(formData.offPiste), carInput: formData.car,
            }
          }
        }
      }).sort((a, b) => b.percentages - a.percentages)
    console.log('calculated array ->', calculation)
    setResorts(calculation)
  }

  const setStateToLocalStorage = (token) => {
    window.localStorage.setItem('ski-selector-data', JSON.stringify(resorts))
    window.localStorage.setItem('ski-selector-choices', JSON.stringify([formData]))
    window.localStorage.setItem('ski-selector-location', JSON.stringify(parseInt(formData.location)))
    window.localStorage.setItem('ski-selector-lunch', JSON.stringify(parseInt(formData.lunch)))
    window.localStorage.setItem('ski-selector-piste', JSON.stringify(parseInt(formData.piste)))
    window.localStorage.setItem('ski-selector-off-piste', JSON.stringify(parseInt(formData.offPiste)))
    // window.localStorage.setItem('ski-selector-location', JSON.stringify(formData.location))

  }

  const removeStateFromStorage = () => {
    window.localStorage.removeItem('ski-selector-data')
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    removeStateFromStorage()
    calculation()
    // navigate(`/resorts/${id}/detail`)
  }

  const saveResults = () => {
    navigate(`/resorts/${id}/personal`)
  }

  // Setting state and handles for add comment modal
  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true)


  return (
    <>
      <main className="ski-selector-page">
        <section className="instruction-overview">
          <div className='selector-title'>
            <h1>Ski Selector</h1>
          </div>
          <div className='selector-overview'>
            <p>{languages ? languageState === 'english' ? languages[47].english : languageState === 'french' ? languages[47].french : languageState === 'german' ? languages[47].german : languages[47].english : ''}
            </p>
          </div>
          <div className='access-buttons'>
            {/* {!isUserAuth() ?
            <button className='modal-launch' onClick={navigate('/login')}></button> : */}
            <button className='modal-launch' onClick={handleShow} data-toggle='modal'>{languages ? languageState === 'english' ? languages[48].english : languageState === 'french' ? languages[48].french : languageState === 'german' ? languages[48].german : languages[48].english : ''}</button>

            {/* Ski Selector tool section - modal will pop up */}

            <Modal show={show} onHide={handleClose} backdrop='static'>

              <Modal.Header className="form-filler">
                <Modal.Title className="form-title">Ski Selector Tool</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className='modal-explanation'>
                  {languages ? languageState === 'english' ? languages[57].english : languageState === 'french' ? languages[57].french : languageState === 'german' ? languages[57].german : languages[57].english : ''}
                </div>
                <hr />
                <Form>
                  <Form.Group className="car-check" controlId="exampleForm.ControlInput1">
                    <Form.Label>{languages ? languageState === 'english' ? languages[58].english : languageState === 'french' ? languages[58].french : languageState === 'german' ? languages[58].german : languages[58].english : ''}</Form.Label>
                    <Form.Control className='checkbox'
                      type="checkbox"
                      checked={formData.car}
                      autoFocus
                      onChange={handleChange}
                      name='car' />
                  </Form.Group>
                  <hr />
                  <div className="form-group-condition">
                    <div>
                      <label className="label">{languages ? languageState === 'english' ? languages[59].english : languageState === 'french' ? languages[59].french : languageState === 'german' ? languages[59].german : languages[59].english : ''}</label>
                    </div>
                    <div className="control">
                      <label className="radio">
                        <input
                          type="radio"
                          name="conditions"
                          value="blue-bird"
                          onChange={handleChange}
                          checked={formData.conditions === 'blue-bird'}
                        />
                        {languages ? languageState === 'english' ? languages[60].english : languageState === 'french' ? languages[60].french : languageState === 'german' ? languages[60].german : languages[60].english : ''}
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="conditions"
                          value="overcast"
                          onChange={handleChange}
                          checked={formData.conditions === 'overcast'}
                        />
                        {languages ? languageState === 'english' ? languages[61].english : languageState === 'french' ? languages[61].french : languageState === 'german' ? languages[61].german : languages[61].english : ''}
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="conditions"
                          value="white-out"
                          onChange={handleChange}
                          checked={formData.conditions === 'white-out'}
                        />
                        {languages ? languageState === 'english' ? languages[62].english : languageState === 'french' ? languages[62].french : languageState === 'german' ? languages[62].german : languages[62].english : ''}
                      </label>
                    </div>
                    <hr />
                  </div>
                  <div className='ratings'>
                    <div className='form-left'>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <div className="form-group">
                          <label htmlFor="rating" className='rating-labels'>{languages ? languageState === 'english' ? languages[43].english : languageState === 'french' ? languages[43].french : languageState === 'german' ? languages[43].german : languages[43].english : ''}</label>
                          <select className="form-control" id="rating" placeholder='Set location score' onChange={handleChange} name='location' type='int'>
                            <option> --- </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </div>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <div className="form-group">
                          <div className='rating-labels'>
                            <label htmlFor="rating" >Piste</label>
                          </div>
                          <select className="form-control" id="rating" placeholder='Set piste score' onChange={handleChange} name='piste'>
                            <option>---</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                    <div className='form-right'>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <div className="form-group">
                          <label htmlFor="rating" className='rating-labels'>{languages ? languageState === 'english' ? languages[44].english : languageState === 'french' ? languages[44].french : languageState === 'german' ? languages[44].german : languages[44].english : ''}</label>
                          <select className="form-control" id="rating" placeholder='Set off-piste score' onChange={handleChange} name='offPiste'>
                            <option> --- </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </div>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1">
                        <div className="form-group">
                          <label htmlFor="rating" className='rating-labels'>{languages ? languageState === 'english' ? languages[45].english : languageState === 'french' ? languages[45].french : languageState === 'german' ? languages[45].german : languages[45].english : ''}</label>
                          <select className="form-control" id="rating" placeholder='Set lunch score' onChange={handleChange} name='lunch'>
                            <option> --- </option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer className="modal-footer">
                <Link to={`/resorts/${id}/detail/`}>
                  <button className='modal-save' onClick={handleSubmit}>
                    {languages ? languageState === 'english' ? languages[64].english : languageState === 'french' ? languages[64].french : languageState === 'german' ? languages[64].german : languages[64].english : ''}

                  </button>
                </Link>
                <button className='modal-save' onClick={saveResults}>
                  {languages ? languageState === 'english' ? languages[63].english : languageState === 'french' ? languages[63].french : languageState === 'german' ? languages[63].german : languages[63].english : ''}
                </button>
                <button className='modal-close' onClick={handleClose}>
                  {languages ? languageState === 'english' ? languages[65].english : languageState === 'french' ? languages[65].french : languageState === 'german' ? languages[65].german : languages[65].english : ''}
                </button>
              </Modal.Footer>
            </Modal>
            <Link to={`/resorts/${id}`}>
              <button>{languages ? languageState === 'english' ? languages[49].english : languageState === 'french' ? languages[49].french : languageState === 'german' ? languages[49].german : languages[49].english : ''}</button>
            </Link>
          </div>
        </section>
        <section className='instruction-middle'>
          <div className='selector-detail'>
            <h3>{languages ? languageState === 'english' ? languages[66].english : languageState === 'french' ? languages[66].french : languageState === 'german' ? languages[66].german : languages[66].english : ''}</h3>
          </div>
        </section>
        <hr />
        <section className='instruction-detail'>
          <div className='instruction-grid'>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/car-white.png" alt="transport icon" />
              </div>
              <div className='method-text'>
                <h4>{languages ? languageState === 'english' ? languages[50].english : languageState === 'french' ? languages[50].french : languageState === 'german' ? languages[50].german : languages[50].english : ''}</h4>
                <hr />
                <p>{languages ? languageState === 'english' ? languages[51].english : languageState === 'french' ? languages[51].french : languageState === 'german' ? languages[51].german : languages[51].english : ''}
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/weather-white.png" alt="weather icon" />
              </div>
              <div className='method-text'>
                <h4>{languages ? languageState === 'english' ? languages[39].english : languageState === 'french' ? languages[39].french : languageState === 'german' ? languages[39].german : languages[39].english : ''}</h4>
                <hr />
                <p>{languages ? languageState === 'english' ? languages[52].english : languageState === 'french' ? languages[52].french : languageState === 'german' ? languages[52].german : languages[52].english : ''}
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/location-white.png" alt="location icon" />
              </div>
              <div className='method-text'>
                <h4>{languages ? languageState === 'english' ? languages[43].english : languageState === 'french' ? languages[43].french : languageState === 'german' ? languages[43].german : languages[43].english : ''}</h4>
                <hr />
                <p>{languages ? languageState === 'english' ? languages[53].english : languageState === 'french' ? languages[53].french : languageState === 'german' ? languages[53].german : languages[53].english : ''}</p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/skiing-white.png" alt="piste icon" />
              </div>
              <div className='method-text'>
                <h4>Piste</h4>
                <hr />
                <p>{languages ? languageState === 'english' ? languages[54].english : languageState === 'french' ? languages[54].french : languageState === 'german' ? languages[54].german : languages[54].english : ''}
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/ski-white-2.png" alt="off piste icon" />
              </div>
              <div className='method-text'>
                <h4>{languages ? languageState === 'english' ? languages[44].english : languageState === 'french' ? languages[44].french : languageState === 'german' ? languages[44].german : languages[44].english : ''}</h4>
                <hr />
                <p>{languages ? languageState === 'english' ? languages[55].english : languageState === 'french' ? languages[55].french : languageState === 'german' ? languages[55].german : languages[55].english : ''}
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/food-white.png" alt="lunch icon" />
              </div>
              <div className='method-text'>
                <h4>{languages ? languageState === 'english' ? languages[45].english : languageState === 'french' ? languages[45].french : languageState === 'german' ? languages[45].german : languages[45].english : ''}</h4>
                <hr />
                <p>{languages ? languageState === 'english' ? languages[56].english : languageState === 'french' ? languages[56].french : languageState === 'german' ? languages[56].german : languages[56].english : ''}
                </p>
              </div>
            </div>
          </div>
        </section>


      </main >
    </>
  )


}

export default SkiSelectorTool

