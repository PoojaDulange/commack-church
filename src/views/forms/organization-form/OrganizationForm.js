/* eslint-disable no-restricted-globals */
import React, { useEffect, useState, useContext } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilLocationPin,
  cilCircle,
  cilPhone,
  cilCalendar,
} from '@coreui/icons'
import axios from '../../../axios.js'
import { UserContext } from '../../../context/UserContext.js'

const USER_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const TELNO_REGEX = /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const ZIP_REGEX = /^\d{5}[-\s]?(?:\d{4})?$/

const OrganizationForm = () => {
  const token = useContext(UserContext)

  const navigate = useNavigate()
  const location = useLocation()
  const [emailExists, setEmailExists] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [noMatch, setNoMatch] = useState('')
  const [numberError, setNumberError] = useState('')
  const [zipError, setZipError] = useState('')

  const [placeholder, setPlaceholder] = useState([])

  const [church, setChurch] = useState([])
  const [state, setState] = useState([])

  const Data = localStorage.getItem('localData')

  const getData = async () => {
    const church = await axios.get('/api/church', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const churchData = church.data.data[0]
    setChurch(churchData[0])
    const response = await axios.get('/api/state', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data1 = response.data.data[0]
    setState([...state, ...data1])
  }

  const handleClick = async () => {
    let password, cpass, email
    if (Data === 'add') {
      email = document.getElementById('email').value
      password = document.getElementById('pass').value
      cpass = document.getElementById('cpass').value
    } else {
      password = null
      cpass = null
      email = placeholder.email
    }
    const churchID = church.churchID
    {
      password !== cpass && password !== null && cpass !== null
        ? setNoMatch('true')
        : setNoMatch('false')
    }

    const mobileNo = document.getElementById('mobno').value.split('-').join('')
    const telNo = document.getElementById('telno').value.split('-').join('')
    const zipcode = document.getElementById('zipcode').value.split('-').join('')
    const obj = {
      organizationID: placeholder.organizationID,
      name: document.getElementById('name').value,
      address1: document.getElementById('add1').value,
      address2: document.getElementById('add2').value,
      city: document.getElementById('city').value,
      stateID: document.getElementById('stateID').value,
      zipcode,
      telNo,
      mobileNo,
      email,
      password,
      enrolledOn: document.getElementById('date').value,
      churchID: churchID,
      url: document.getElementById('url').value,
    }
    if (Data === 'add') {
      if (obj.email === '' || obj.password === '')
        document.querySelector('#fail-message').innerHTML = 'Please fill out field(s)'
    }
    let inputFields = document.getElementsByClassName('formInput')
    if (obj.stateID === '') {
      document.querySelector('#fail-message').innerHTML = 'Please fill out field(s)'
    }

    for (var i = 0; i < inputFields.length; i++) {
      if (inputFields[i].value === '') {
        document.querySelector('#fail-message').innerHTML =
          'Please fill out ' + inputFields[i].getAttribute('name') + ' field(s)'
      }
    }
    const v3 = TELNO_REGEX.test(obj.telNo)
    const v4 = TELNO_REGEX.test(obj.mobileNo)
    const v5 = ZIP_REGEX.test(obj.zipcode)

    const orgResponse = await axios.get('/api/organization/', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data = orgResponse.data.data[0]
    if (Data === 'add') {
      const v1 = USER_REGEX.test(obj.email)
      const v2 = PWD_REGEX.test(obj.password)

      data.map((data) => {
        if (data.email === obj.email) {
          setEmailExists(true)
        }
      })
      if (emailExists === true) {
        setEmailExists(false)
        return
      }
      if (v1 === false) {
        setErrorMessage('Invalid Email')
        return
      } else {
        setErrorMessage('')
      }
      if (!v2) {
        setErrorMessage('Invalid Password')
        return
      } else {
        setErrorMessage('')
      }
    }

    if (v3 === false || v4 === false) {
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
    console.log(obj)
    if (confirm('Do You want to make changes') === true) {
      if (Data === 'add') {
        await axios.post('/api/organization', obj, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        navigate('/forms/organization-table')
      }
      if (Data === 'edit') {
        await axios.patch('/api/organization', obj, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        navigate('/forms/organization-table')
      }
    } else {
    }
  }

  useEffect(() => {
    if (Data === 'edit') {
      const data = location.state
      setPlaceholder({ ...placeholder, ...data })
    }
    if (Data === 'add') {
      const obj = {
        name: 'Enter Name',
        address1: 'Enter Address1',
        address2: 'Enter Address2',
        city: 'Enter city',
        stateID: 'Please select state',
        email: 'Enter Email',
        enrolledOn: 'Enter Enrollment Date',
        mobileNo: 'Enter Mobile No',
        telNo: 'Enter Telephone No.',
        url: 'Enter URL',
        zipcode: 'Enter Zipcode',
      }
      setPlaceholder({ ...placeholder, ...obj })
    }
    getData()
    disableDate()
  }, [])
  const disableDate = () => {
    var today, dd, mm, yyyy
    today = new Date()
    dd = today.getDate()
    mm = today.getMonth() + 1
    yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    const day = yyyy + '-' + mm + '-' + dd
    return day
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
            <strong>Organization</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CFormLabel>
                Organization Name<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  id="name"
                  className="formInput"
                  placeholder={placeholder.name}
                  required
                />
              </CInputGroup>
              <CFormLabel>
                Address1<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLocationPin} />
                </CInputGroupText>
                <CFormInput
                  id="add1"
                  className="formInput"
                  placeholder={placeholder.address1}
                  required
                />
              </CInputGroup>
              <CFormLabel>Address2</CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLocationPin} />
                </CInputGroupText>
                <CFormInput id="add2" placeholder={placeholder.address2} />
              </CInputGroup>
              <CFormLabel>
                City<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />
                </CInputGroupText>
                <CFormInput
                  id="city"
                  className="formInput"
                  placeholder={placeholder.city}
                  required
                />
              </CInputGroup>

              <CFormLabel>
                State<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                  <CIcon icon={cilLocationPin} />
                </CInputGroupText>
                <select
                  className="form-select"
                  id="stateID"
                  aria-label="Default select example"
                  required
                >
                  <option value={placeholder.stateID}>{placeholder.stateID}</option>
                  {state.map((state, index) => {
                    return (
                      <option key={index} value={state.stateID}>
                        {state.stateID}
                      </option>
                    )
                  })}
                </select>
              </CInputGroup>
              <CFormLabel>
                Zipcode<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />
                </CInputGroupText>
                <CFormInput
                  id="zipcode"
                  className="formInput"
                  placeholder={placeholder.zipcode}
                  maxLength={9}
                  minLength={9}
                  onBlur={handleZip}
                  required
                />
              </CInputGroup>
              {zipError === 'Invalid Zipcode' && (
                <p style={{ color: 'red' }}>Invalid Zipcode number</p>
              )}

              <CFormLabel>
                Telephone No.<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilPhone} />
                </CInputGroupText>
                <CFormInput
                  id="telno"
                  className="formInput"
                  maxLength={10}
                  minLength={10}
                  placeholder={placeholder.telNo}
                  onBlur={handleNumber}
                  required
                />
              </CInputGroup>
              <CFormLabel>
                Mobile No.<span style={{ color: 'red' }}>*</span>
              </CFormLabel>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilPhone} />
                </CInputGroupText>
                <CFormInput
                  id="mobno"
                  className="formInput"
                  placeholder={placeholder.mobileNo}
                  maxLength={10}
                  minLength={10}
                  onBlur={handleNumber}
                  required
                />
              </CInputGroup>
              {numberError !== 'Invalid Number' && <p style={{ color: 'red' }}>{numberError}</p>}
              {Data === 'add' && (
                <>
                  <CFormLabel>
                    Email<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput id="email" placeholder="Email" required />
                  </CInputGroup>
                  {emailExists === true && <p style={{ color: 'red' }}>Email Already Exists</p>}
                  {errorMessage === 'Invalid Email' && (
                    <p style={{ color: 'red' }}>
                      4 to 24 Characters
                      <br />
                      Must begin with letter.
                      <br />
                      Letters, Numbers, underscores and hyphens allowed.
                    </p>
                  )}
                  <CFormLabel>
                    Password<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput type="password" id="pass" placeholder="Password" required />
                  </CInputGroup>
                  <CFormLabel>
                    Confirm Password<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      id="cpass"
                      placeholder="Confirm Password"
                      required
                    />
                  </CInputGroup>
                  {noMatch === 'true' && <p style={{ color: 'red' }}>Passwords does not match </p>}
                  {errorMessage === 'Invalid Password' && (
                    <p style={{ color: 'red' }}>
                      8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and aspecial character.
                      <br />
                      Allowed special characters: <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                      <span aria-label="dollar-sign">$</span> <span aria-label="percentage">%</span>
                    </p>
                  )}
                </>
              )}
              <CFormLabel>
                Enrolled On<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  type="date"
                  className="formInput"
                  id="date"
                  max={disableDate}
                  required
                />
              </CInputGroup>

              <CFormLabel>
                URL<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>@ </CInputGroupText>
                <CFormInput
                  type="text"
                  className="formInput"
                  id="url"
                  placeholder={placeholder.url}
                  required
                />
              </CInputGroup>
              <span id="fail-message" style={{ color: 'red' }}></span>

              <div className="d-md-flex justify-content-md-center gap-2">
                <CButton type="submit" onClick={handleClick}>
                  Submit
                </CButton>
                <Link to="/forms/organization-table/">
                  <CButton type="submit">Cancel</CButton>
                </Link>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OrganizationForm
