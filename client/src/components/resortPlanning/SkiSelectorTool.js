import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Select from 'react-select'
import Slider from 'react-input-slider'
// import Modal from 'react-bootstrap/Modal'
import { Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/esm/FormGroup'


const SkiSelectorTool = () => {

  const navigate = useNavigate()


  const [errors, setErrors] = useState(false)

  const [totalPoints, setTotalPoints] = useState(100)
  const [locationValue, setLocationValue] = useState(0)
  const [pisteValue, setPisteValue] = useState(0)
  const [offPisteValue, setOffPisteValue] = useState(0)
  const [breadthValue, setBreadthValue] = useState(0)
  const [lunchValue, setLunchValue] = useState(0)

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




  const calculation = () => {
    const calculation =
      resorts.map(resort => {
        if (formData.conditions === 'blue-bird') {
          if (formData.car) {
            return {
              ...resort, percentages: parseFloat(((formData.location * resort.car_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.blue_bird_score * 20)) / 500).toFixed(3),
            }
          } else {
            return {
              ...resort, percentages: parseFloat(((formData.location * resort.bus_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.blue_bird_score * 20)) / 500).toFixed(3),
            }
          }
        } else if (formData.conditions === 'overcast') {
          if (formData.car) {
            return {
              ...resort, percentages: parseFloat(((formData.location * resort.car_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.overcast_score * 20)) / 500).toFixed(3),
            }
          } else {
            return {
              ...resort, percentages: parseFloat(((formData.location * resort.bus_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.overcast_score * 20)) / 500).toFixed(3),
            }
          }
        } else if (formData.conditions === 'white-out') {
          if (formData.car) {
            return {
              ...resort, percentages: parseFloat(((formData.location * resort.car_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.white_out_score * 20)) / 500).toFixed(3),
            }
          } else {
            return {
              ...resort, percentages: parseFloat(((formData.location * resort.bus_score) + (formData.piste * resort.piste_score) + (formData.piste * resort.off_piste_score) + (formData.lunch * resort.lunch_score) + (resort.white_out_score * 20)) / 500).toFixed(3),
            }
          }
        }
      }).sort((a, b) => b.percentages - a.percentages)
    console.log('new array ->', calculation)
    setResorts(calculation)

  }

  const setStateToLocalStorage = (token) => {
    window.localStorage.setItem('ski-selector-data', JSON.stringify(resorts))
    window.localStorage.setItem('ski-selector-choices', JSON.stringify(formData))
  }

  const removeStateFromStorage = () => {
    window.localStorage.removeItem('ski-selector-data')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    removeStateFromStorage()
    calculation()
    setStateToLocalStorage()
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
        {/* <section className='ski-selector-content'> */}
        <section className="instruction-overview">
          <div className='selector-title'>
            <h1>Ski Selector</h1>
          </div>
          <div className='selector-overview'>
            <p>Where you want to ski on a particular day can be
              massively impacted by the conditions and how you&apos;re feeling.
              Ski selector helps with this. Just add your inputs for the 6 dimensions below
              and we&apos;ll find the best spot for you to ski.
            </p>
          </div>
          <div className='access-buttons'>
            <button className='modal-launch' onClick={handleShow} data-toggle='modal'>Use the tool</button>
            <Modal show={show} onHide={handleClose} backdrop='static'>

              <Modal.Header className="form-filler">
                <Modal.Title className="form-title">Ski Selector Tool</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className='modal-explanation'>
                  Input your values below
                </div>
                <hr />
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Do you have a car?</Form.Label>
                    <Form.Control
                      type="checkbox"
                      checked={formData.car}
                      autoFocus
                      onChange={handleChange}
                      name='car' />
                  </Form.Group>
                  <hr />
                  <div className="form-group-condition">
                    <div>
                      <label className="label">What are the conditions?</label>
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
                        Blue Bird
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="conditions"
                          value="overcast"
                          onChange={handleChange}
                          checked={formData.conditions === 'overcast'}
                        />
                        Overcast
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="conditions"
                          value="white-out"
                          onChange={handleChange}
                          checked={formData.conditions === 'white-out'}
                        />
                        White Out
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
                          <label htmlFor="rating" className='rating-labels'>Location</label>
                          <select className="form-control" id="rating" placeholder='Set location score' onChange={handleChange} name='location'>
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
                          <label htmlFor="rating" className='rating-labels'>Off piste</label>
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
                          <label htmlFor="rating" className='rating-labels'>Lunch</label>
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
                <hr/>
              </Modal.Body>
              <Modal.Footer className="modal-footer">
                <button className='modal-save' onClick={handleSubmit}>
                  Submit scores
                </button>
                <button className='modal-close' onClick={handleClose}>
                  Close
                </button>
              </Modal.Footer>
            </Modal>
            <button>Show me the list</button>
          </div>
        </section>
        <section className='instruction-middle'>
          <div className='selector-detail'>
            {/* <h3>How it works</h3> */}
            {/* <p>How does it work? Add your inputs for the 6 dimensions below. We&apos;ll do the rest. </p> */}
          </div>
        </section>
        <section className='instruction-detail'>
          <div className='instruction-grid'>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/car-white.png" alt="transport icon" />
              </div>
              <div className='method-text'>
                <h4>Transport</h4>
                <hr />
                <p>Although there are plenty of bus routes, Chamonix can be tricky to navigate without
                  a car. We&apos;ll account for this when we&apos;re finding the best place for you.
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/weather-white.png" alt="weather icon" />
              </div>
              <div className='method-text'>
                <h4>Weather</h4>
                <hr />
                <p>The weather can have a huge impact on your day&apos;s skiing. We have rated each area based
                  on how they ski in clear, cloudy and white-out conditions
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/location-white.png" alt="location icon" />
              </div>
              <div className='method-text'>
                <h4>Location</h4>
                <hr />
                <p>There is a range of options available for skiing within the Chamonix Valley spread fairly widely. You should
                  rate how much you value the convenience of being close to the centre of Chamonix.
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/skiing-white.png" alt="piste icon" />
              </div>
              <div className='method-text'>
                <h4>Piste</h4>
                <hr />
                <p>We have rated the breadth and the quality fo pistes in a particular area. The difficulty is factored into this,
                  but make sure you check the difficulty before you make a decision.
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/ski-white-2.png" alt="off piste icon" />
              </div>
              <div className='method-text'>
                <h4>Off Piste</h4>
                <hr />
                <p>There are some incredible places to explore in the Chamonix Valley if you want to find them. Our off-piste rating largely
                  focuses on accessible routes within the main mountain areas.
                </p>
              </div>
            </div>
            <div className='method-row'>
              <div className='method-icons'>
                <img src="/project-images/food-white.png" alt="lunch icon" />
              </div>
              <div className='method-text'>
                <h4>Lunch</h4>
                <hr />
                <p>Lunch can a huge element of a great day&apos;s skiing, but sometimes you might just want to pack a quick bite to maximise
                  time on the slopes. This value accounts for this.
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

