import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { getAccessToken, isUserAuth, isUserOwner } from '../auth/Auth.js'
import Form from 'react-bootstrap/Form'
import ImageUpload from '../helpers/ImageUpload.js'


const Resorts = () => {

  const [resorts, setResorts] = useState([])

  const { id } = useParams()

  const navigate = useNavigate()

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



  useEffect(() => {
    const getResorts = async () => {
      const { data } = await axios.get('/api/resorts/')
      setResorts(data)
      console.log(data)
      // isUserOwner()
    }
    getResorts()
  }, [])


  // Data to be inputted in the modal when adding a resort
  const [formData, setFormData] = useState({
    resort: '',
    country: '',
    mountain_range: '',
    total_length: '',
    base: '',
    peak: '',
    size_range: '',
    beginner: '',
    intermediate: '',
    expert: '',
    mountain_image: '',
    resort_image: '',
  })

  const [errors, setErrors] = useState({})

  // Handle function for changing the data when the boxes are populated
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    console.log(e.target.value)
    console.log('Form data -->', formData)
  }

  // SUBMITES THE POST REQUEST FOR DATA TO BE ADDED TO THE DATABASE
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/resorts/', formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('successful post data ->', data)
      modalClose()
    } catch (err) {
      setErrors('error data ->', err.response.data)
    }
  }

  // Sets the parameters for the loading of modal
  const [show, setShow] = useState(false)
  const modalClose = () => {
    setShow(false)
  }
  const modalShow = () => setShow(true)


  const deleteResort = async () => {
    console.log('hit the delete route')
    console.log(id)
    try {
      // Sending delete request
      await axios.delete(`api/resorts/${id}/`) // , {
      console.log(id)
      // headers: {
      //   Authorization: `Bearer ${getAccessToken()}`,
      // },
      // })
      navigate('/resorts')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <section className='resort-page'>
        <div className='title'>
          <h1>{languages ? languageState === 'english' ? languages[10].english : languageState === 'french' ? languages[10].french : languages[10].german : ''}</h1>
          <h4>{languages ? languageState === 'english' ? languages[11].english : languageState === 'french' ? languages[11].french : languages[11].german : ''}</h4>
        </div>
        <div className='resort-list'>
          <h3>{resorts.length} {languages ? languageState === 'english' ? languages[12].english : languageState === 'french' ? languages[12].french : languages[12].german : ''}</h3>
          <hr />
          <div className='resort-grid'>
            {resorts.map(resort => {
              return (
                <div className='resorts' key={resort.id}>

                  <div className='resort-image'>
                    <img src={resort.mountain_image} alt='landscape' />
                  </div>
                  <div className='resort-content'>
                    <h1>{resort.resort} ({resort.country})</h1>
                    <div className='buttons'>
                      <button className='link'> <Link to={`/resorts/${resort.id}`}>{languages ? languageState === 'english' ? languages[14].english : languageState === 'french' ? languages[14].french : languages[14].german : ''}</Link></button>
                      {isUserAuth() ?
                        // isUserOwner ?
                        <button className='delete' onClick={deleteResort}>Delete resort</button>
                        : ''
                        // : ''
                      }
                    </div>
                    <hr />
                    <div className='info-row'>
                      <div className='icon-container'>
                        <img src='/project-images/mountain.png' alt='peak' />
                      </div>
                      <h3>{resort.peak}m {languages ? languageState === 'english' ? languages[13].english : languageState === 'french' ? languages[13].french : languages[13].german : ''}</h3>

                    </div>
                    <div className='info-row'>
                      <div className='icon-container'>
                        <img src='/project-images/town.png' alt='peak' />
                      </div>
                      <h3>{resort.base}m {languages ? languageState === 'english' ? languages[15].english : languageState === 'french' ? languages[15].french : languages[15].german : ''}</h3>

                    </div>
                    <div className='info-row'>
                      <div className='icon-container'>
                        <img src='/project-images/arrows.png' alt='peak' />
                      </div>
                      <h3>{resort.total_length}km {languages ? languageState === 'english' ? languages[16].english : languageState === 'french' ? languages[16].french : languages[16].german : ''}</h3>

                    </div>
                    <div className='info-row'>
                      <div className='icon-container'>
                        <div className='black-colour'>
                          <h1>.</h1>
                        </div>
                      </div>
                      <h3>{resort.expert} {languages ? languageState === 'english' ? languages[17].english : languageState === 'french' ? languages[17].french : languages[17].german : ''}</h3>

                    </div>
                    <div className='info-row'>
                      <div className='icon-container'>
                        <div className='red-colour'>
                          <h1>.</h1>
                        </div>
                      </div>
                      <h3>{resort.intermediate} {languages ? languageState === 'english' ? languages[18].english : languageState === 'french' ? languages[18].french : languages[18].german : ''}</h3>

                    </div>
                    <div className='info-row'>
                      <div className='icon-container'>
                        <div className='blue-colour'>
                          <h1>.</h1>
                        </div>
                      </div>
                      <h3>{resort.beginner} {languages ? languageState === 'english' ? languages[19].english : languageState === 'french' ? languages[19].french : languages[19].german : ''}</h3>

                    </div>
                  </div>
                  {/* </Link> */}

                </div>
              )
            })}
          </div>
        </div>
        <hr />
        <div className='add-resort-section'>
          <h4>{languages ? languageState === 'english' ? languages[20].english : languageState === 'french' ? languages[20].french : languages[20].german : ''}</h4>
          {isUserAuth() ?
            <>
              <button className='add-resort-btn' onClick={modalShow}>{languages ? languageState === 'english' ? languages[77].english : languageState === 'french' ? languages[77].french : languages[77].german : ''}</button>
              <Modal show={show} onHide={modalClose} backdrop='static' className='add-resort-modal'>
                <Modal.Header className="add-header">
                  <Modal.Title className="add-title">{languages ? languageState === 'english' ? languages[77].english : languageState === 'french' ? languages[77].french : languages[77].german : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='add-resort-body'>
                  <Form>
                    <div className="summary">
                      <h6>{languages ? languageState === 'english' ? languages[43].english : languageState === 'french' ? languages[43].french : languages[43].german : ''}</h6>
                      <div className='summary-details'>
                        <Form.Group >
                          {/* <label className='resort-labels'>Resort</label> */}
                          <input type="text" onChange={handleChange} name='resort' placeholder={languages ? languageState === 'english' ? languages[78].english : languageState === 'french' ? languages[78].french : languages[78].german : ''}></input>
                        </Form.Group>
                        <Form.Group >
                          {/* <label className='resort-labels'>Resort</label> */}
                          <input type="text" onChange={handleChange} name='country' placeholder={languages ? languageState === 'english' ? languages[79].english : languageState === 'french' ? languages[79].french : languages[79].german : ''}></input>
                        </Form.Group>
                        <Form.Group >
                          {/* <label className='resort-labels'>Resort</label> */}
                          <input type="text" onChange={handleChange} name='mountain_range' placeholder={languages ? languageState === 'english' ? languages[80].english : languageState === 'french' ? languages[80].french : languages[80].german : ''}></input>
                        </Form.Group>
                      </div>
                      <hr />
                    </div>
                    <div className="resort-stats">
                      <h6>{languages ? languageState === 'english' ? languages[81].english : languageState === 'french' ? languages[81].french : languages[81].german : ''}</h6>
                      <div className='resort-stats-details'>
                        <div className='form-left'>
                          <Form.Group >
                            <label className='resort-labels'>{languages ? languageState === 'english' ? languages[82].english : languageState === 'french' ? languages[82].french : languages[82].german : ''}(m)</label>
                            <input type="text" onChange={handleChange} name='base'></input>
                          </Form.Group>
                          <Form.Group >
                            <label className='resort-labels'>{languages ? languageState === 'english' ? languages[83].english : languageState === 'french' ? languages[83].french : languages[83].german : ''}(m)</label>
                            <input type="text" onChange={handleChange} name='peak'></input>
                          </Form.Group>
                        </div>
                        <div className="form-right">
                          <Form.Group >
                            <label className='resort-labels'>{languages ? languageState === 'english' ? languages[84].english : languageState === 'french' ? languages[84].french : languages[84].german : ''}(m)</label>
                            <input type="text" onChange={handleChange} name='size_range'></input>
                          </Form.Group>
                          <Form.Group >
                            <label className='resort-labels'>{languages ? languageState === 'english' ? languages[89].english : languageState === 'french' ? languages[89].french : languages[89].german : ''}(km)</label>
                            <input type="text" onChange={handleChange} name='total_length'></input>
                          </Form.Group>
                        </div>
                      </div>
                      <hr />
                    </div>
                    <div className="ski-stats">
                      <h6>Ski runs</h6>
                      <div className='ski-stats-details'>
                        <Form.Group >
                          <div className='ski-stat-row'>
                            <div className='blue'>.</div>
                            <label className='resort-labels'>{languages ? languageState === 'english' ? languages[19].english : languageState === 'french' ? languages[19].french : languages[19].german : ''}</label>
                            <input type="text" onChange={handleChange} name='beginner'></input>
                          </div>
                        </Form.Group>
                        <Form.Group >
                          <div className='ski-stat-row'>
                            <div className='red'>.</div>
                            <label className='resort-labels'>{languages ? languageState === 'english' ? languages[18].english : languageState === 'french' ? languages[18].french : languages[18].german : ''}</label>
                            <input type="text" onChange={handleChange} name='intermediate'></input>
                          </div>
                        </Form.Group>
                        <Form.Group >
                          <div className='ski-stat-row'>
                            <div className='black'>.</div>
                            <label className='resort-labels'>{languages ? languageState === 'english' ? languages[17].english : languageState === 'french' ? languages[17].french : languages[17].german : ''}</label>
                            <input type="text" onChange={handleChange} name='expert'></input>
                          </div>
                        </Form.Group>
                      </div>
                      <hr />
                    </div>
                    <ImageUpload
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                  <Link to={`/resorts/${id}/detail/`}>
                    <button className='modal-save' onClick={handleSubmit}>
                      {languages ? languageState === 'english' ? languages[88].english : languageState === 'french' ? languages[88].french : languages[88].german : ''}
                    </button>
                  </Link>
                  <button className='modal-close' onClick={modalClose}>
                    {languages ? languageState === 'english' ? languages[65].english : languageState === 'french' ? languages[65].french : languages[65].german : ''}
                  </button>
                </Modal.Footer>
              </Modal>
            </>

            :
            <Link to={'/login'}><button>{languages ? languageState === 'english' ? languages[21].english : languageState === 'french' ? languages[21].french : languages[21].german : ''}</button></Link>
          }
        </div>
      </section >
    </>
  )


}

export default Resorts