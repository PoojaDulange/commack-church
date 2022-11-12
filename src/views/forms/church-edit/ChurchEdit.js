import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../axios.js'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CFormLabel,
  CFormTextarea,
  CRow,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { cilUser, cilLocationPin, cilCircle, cilMobile, cilList } from '@coreui/icons'

import { DocsExample } from 'src/components'

import { UserContext } from '../../../context/UserContext.js'
const TELNO_REGEX = /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const ZIP_REGEX = /^\d{5}[-\s]?(?:\d{4})?$/

const ChurchForm = () => {
  const token = useContext(UserContext)
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [state, setState] = useState([])

  const [numberError, setNumberError] = useState('')
  const [zipError, setZipError] = useState('')

  const getData = async () => {
    const response1 = await axios.get('/api/state/', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    setState(response1.data.data[0])
    const response = await axios.get('/api/church/', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data1 = response.data.data[0]
    data1[0].zipcode = data1[0].zipcode.substr(0, 5) + '-' + data1[0].zipcode.substr(5)
    const part1 = data1[0].mobileNo.substr(0, 3) + '-'
    const part2 = data1[0].mobileNo.substr(3, 3) + '-'
    const part3 = data1[0].mobileNo.substr(6)
    data1[0].mobileNo = part1 + part2 + part3
    setData((prevState) => ({ ...prevState, ...data1[0] }))
  }

  useEffect(() => {
    getData()
  }, [])
  const handleClick = async () => {
    console.log(data)
    let obj = data
    obj.mobileNo = obj.mobileNo.split('-').join('')
    obj.zipcode = obj.zipcode.split('-').join('')
    // const obj = {
    //   churchID: data.churchID,
    //   name: document.getElementById('name').value,
    //   description: document.getElementById('description').value,
    //   address1: document.getElementById('address1').value,
    //   address2: document.getElementById('address2').value,
    //   city: document.getElementById('city').value,
    //   stateID: document.getElementById('stateID').value,
    //   zipcode,
    //   mobileNo,
    //   email: data.email,
    //   churchURL: document.getElementById('url').value,
    // }

    // let inputFields = document.getElementsByClassName('formInput')
    // if (obj.stateID === '') {
    //   document.querySelector('#fail-message').innerHTML = 'Please fill out field(s)'
    // }

    // for (var i = 0; i < inputFields.length; i++) {
    //   if (inputFields[i].value === '') {
    //     document.querySelector('#fail-message').innerHTML =
    //       'Please fill out ' + inputFields[i].getAttribute('name') + ' field(s)'
    //   }
    // }
    const v4 = TELNO_REGEX.test(obj.mobileNo)
    const v5 = ZIP_REGEX.test(obj.zipcode)
    if (v4 === false) {
      setNumberError('Invalid Number')
      return
    } else {
      setNumberError('')
    }
    if (!v5) {
      setZipError('Invalid Zipcode')
      return
    } else {
      setZipError('')
    }
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do You want to make changes') === true) {
      try {
        await axios.patch('/api/church/', obj, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        navigate('/forms/church-profile/')
      } catch (err) {
        console.log(err)
      }
    } else {
    }
  }
  const handleZip = (e) => {
    e.preventDefault()
    const data = e.target.value.length
    if (data === 9) e.target.value = e.target.value.substr(0, 5) + '-' + e.target.value.substr(5)
  }
  const handleNumber = (e) => {
    e.preventDefault()
    const length = e.target.value.length
    if (length === 10)
      e.target.value =
        e.target.value.substr(0, 3) +
        '-' +
        e.target.value.substr(3, 3) +
        '-' +
        e.target.value.substr(6)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 col-8 m-auto">
          <CCardHeader className="text-center">
            <strong>Edit Church</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/form-control">
              <CForm>
                <CFormLabel htmlFor="name">
                  Church Name<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    className="formInput"
                    type="text"
                    id="name"
                    placeholder={data.name}
                    onChange={(e) => (data.name = e.target.value)}
                    required
                  />
                </CInputGroup>
                <CFormLabel htmlFor="description">
                  Description<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilList}></CIcon>
                  </CInputGroupText>
                  <CFormTextarea
                    id="description"
                    rows="3"
                    className="formInput"
                    placeholder={data.description}
                    onChange={(e) => (data.description = e.target.value)}
                    required
                  ></CFormTextarea>
                </CInputGroup>
                <CFormLabel htmlFor="address1">
                  Address1<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLocationPin} />
                  </CInputGroupText>
                  <CFormInput
                    className="formInput"
                    type="text"
                    id="address1"
                    placeholder={data.address1}
                    onChange={(e) => (data.address1 = e.target.value)}
                    required
                  />
                </CInputGroup>
                <CFormLabel htmlFor="address2">Address2</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLocationPin} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    id="address2"
                    placeholder={data.address2}
                    onChange={(e) => (data.address2 = e.target.value)}
                  />
                </CInputGroup>
                <CFormLabel htmlFor="city">
                  City<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilCircle} />
                  </CInputGroupText>
                  <CFormInput
                    className="formInput"
                    type="text"
                    id="city"
                    placeholder={data.city}
                    onChange={(e) => (data.city = e.target.value)}
                    required
                  />
                </CInputGroup>
                <CFormLabel htmlFor="state">
                  State<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilCircle} />
                  </CInputGroupText>
                  <select
                    className="form-select"
                    id="stateID"
                    aria-label="Default select example"
                    onChange={(e) => (data.stateID = e.target.value)}
                    required
                  >
                    <option value={data.stateID}>{data.stateID}</option>
                    {state.map((state, index) => {
                      return (
                        <option key={index} value={state.stateID}>
                          {state.stateID}
                        </option>
                      )
                    })}
                  </select>
                </CInputGroup>
                <CFormLabel htmlFor="zipcode">
                  Zipcode<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilCircle} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    className="formInput"
                    id="zipcode"
                    placeholder={data.zipcode}
                    minLength={9}
                    maxLength={9}
                    onBlur={handleZip}
                    onChange={(e) => (data.zipcode = e.target.value)}
                    required
                  />
                </CInputGroup>
                {zipError === 'Invalid Zipcode' && (
                  <p style={{ color: 'red' }}>Invalid Zipcode number</p>
                )}

                <CFormLabel htmlFor="number">
                  Mobile No.<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilMobile} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    className="formInput"
                    id="number"
                    minLength={10}
                    maxLength={10}
                    placeholder={data.mobileNo}
                    onBlur={handleNumber}
                    onChange={(e) => (data.mobileNo = e.target.value)}
                    required
                  />
                </CInputGroup>
                <CFormLabel>
                  URL<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@ </CInputGroupText>
                  <CFormInput
                    className="formInput"
                    type="text"
                    id="url"
                    placeholder={data.churchURL}
                    onChange={(e) => (data.churchURL = e.target.value)}
                    required
                  />
                </CInputGroup>

                <span id="fail-message" style={{ color: 'red' }}></span>
                {numberError !== 'Invalid Number' && <p style={{ color: 'red' }}>{numberError}</p>}

                <div className="gap-2 d-md-flex justify-content-md-center">
                  <CButton onClick={handleClick}>Submit</CButton>
                  <Link to="/forms/church-profile">
                    <CButton>Cancel</CButton>
                  </Link>
                </div>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ChurchForm
