import axios from 'axios'
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'


const ImageUpload = ({ formData, setFormData }) => {


  const uploadURL = 'https://api.cloudinary.com/v1_1/ddqsv9w3r/image/upload'
  const preset = 'jyaritbs'

  console.log('upload url ->', uploadURL, preset)

  const resortImageUpload = async e => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', preset)
    const res = await axios.post(uploadURL, data)

    console.log('data', res.data)
    setFormData({ ...formData, resort_image: res.data.url })
  }

  const mountainImageUpload = async e => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', preset)
    const res = await axios.post(uploadURL, data)
    console.log('data', res.data)
    setFormData({ ...formData, mountain_image: res.data.url })
  }

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


  return (

    <div className='image-upload'>
      <Form.Group>
        <div className='upload'>
          <label htmlFor="resort_image" className="image">* {languages ? languageState === 'english' ? languages[85].english : languageState === 'french' ? languages[85].french : languageState === 'german' ? languages[85].german : languages[85].english : ''}</label>
          <input
            name="resort_image"
            className="input"
            type="file"
            onChange={resortImageUpload}
          />
        </div>
      </Form.Group>
      <Form.Group>
        <div className='upload'>
          <label htmlFor="mountain_image" className="image">* {languages ? languageState === 'english' ? languages[86].english : languageState === 'french' ? languages[86].french : languageState === 'german' ? languages[86].german : languages[86].english : ''}</label>
          <input
            name="mountain_image"
            className="input"
            type="file"
            onChange={mountainImageUpload}
          />
        </div>
      </Form.Group>
    </div>
  )


}

export default ImageUpload