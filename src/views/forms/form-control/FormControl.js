import React, { useState, useEffect, useContext } from 'react'
import axios from '../../../axios.js'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { UserContext } from '../../../context/UserContext.js'

import {
  cilLockLocked,
  cilUser,
  cilLocationPin,
  cilCircle,
  cilPhone,
  cilMobile,
} from '@coreui/icons'

import { DocsExample } from 'src/components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'

const ALPHA = /^[A-Za-z]+$/
const USER_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const TELNO_REGEX = /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const ZIPCODE = /^\d{5}[-\s]?(?:\d{4})?$/

const FormControl = () => {
  const token = useContext(UserContext)
  const navigate = useNavigate()
  const Data = localStorage.getItem('localData')
  const [placeholder, setPlaceholder] = useState([])
  const [emailExists, setEmailExists] = useState(false)
  const [passMatch, setPassMatch] = useState(false)

  const [noMatch, setNoMatch] = useState('')
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState([])
  const [zipcode, setZipcode] = useState('')
  const [telNo, setTelNo] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [email, setEmail] = useState('')
  const [id, setID] = useState(0)
  const [data, setData] = useState([])
  const [numberError, setNumberError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [cpass, setCpass] = useState('')
  const location = useLocation()
  const getPeopleData = async (id) => {
    setID(id)
    const d = await axios.get(`/api/people/${id}`, {
      headers: { Authorization: `Bearer ${token.user}` },
    })

    setEmail(d.data.data[0].email)

    setData(d.data.data[0])
  }
  useEffect(() => {
    const d = localStorage.getItem('peopleID')
    if (d !== 'null') {
      getPeopleData(d)
    }
  }, [])

  const addPeople = async () => {
    const response = await axios('/api/church', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data1 = response.data.data[0]
    var elements = document.getElementsByName('form-check')
    var gender_value
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].checked) {
        gender_value = elements[i].value
      }
    }
    const obj = {
      peopleID: id,
      churchID: data1[0].churchID,
      firstName,
      middleName,
      lastName,
      address1,
      address2,
      city,
      stateID: document.getElementById('stateID').value,
      zipcode: zipcode.split('-').join(''),
      telNo: telNo.split('-').join(''),
      mobileNo: mobileNo.split('-').join(''),
      gender: gender_value,
      email,
      password,
    }

    if (Data === 'add') {
      {
        password !== cpass && password !== null && cpass !== null
          ? setNoMatch('true')
          : setNoMatch('false')
      }
      console.log()
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

      if (!v1) {
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
    if (mobileNo === '') {
      setErrorMessage(null)
      return
    } else if (!TELNO_REGEX.test(mobileNo)) {
      setNumberError('Invalid Number')
      return
    }
    if (telNo === '') {
      setErrorMessage(null)
      return
    } else if (!TELNO_REGEX.test(telNo)) {
      setNumberError('Invalid Number')
      return
    }
    if (firstName === '') {
      setErrorMessage(null)
      return
    } else if (!ALPHA.test(firstName)) {
      setErrorMessage('Invalid firstName')
      return
    }
    if (middleName === '') {
      setErrorMessage(null)
      return
    } else if (ALPHA.test(middleName) === false) {
      setErrorMessage('Invalid middleName')
      return
    }
    if (lastName === '') {
      setErrorMessage(null)
      return
    } else if (!ALPHA.test(lastName)) {
      setErrorMessage('Invalid lastName')
      return
    }
    if (address1 === '') {
      setErrorMessage(null)
      return
    }
    if (city === '') {
      setErrorMessage(null)
      return
    } else if (!ALPHA.test(city)) {
      setErrorMessage('Invalid city')
      return
    }
    if (obj.stateID === '') {
      console.log(state)
      setErrorMessage(null)
      return
    }
    if (zipcode === '') {
      setNumberError(null)
      return
    } else if (!ZIPCODE.test(zipcode)) {
      setNumberError('Invalid Zipcode')
      return
    }
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do You want to make changes') === true) {
      // if (id === 0) {
      try {
        await axios.post('/api/people/', obj, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        navigate('/forms/people-table/')
      } catch (err) {
        console.log(err)
      }
      // } else {
      //   try {
      //     axios.patch('/api/people/', obj, {
      //       headers: { Authorization: `Bearer ${token.user}` },
      //     })
      //     navigate('/forms/people-table/')
      //   } catch (err) {
      //     console.log(err)
      //   }
      // }
    } else {
    }
  }
  const editPeople = async () => {
    let obj = placeholder
    console.log(obj)

    const v3 = TELNO_REGEX.test(obj.telNo)
    const v4 = TELNO_REGEX.test(obj.mobileNo)
    const v5 = ZIPCODE.test(obj.zipcode)
    if (v3 === false || v4 === false) {
      setNumberError('Invalid Number')
      return
    }
    if (ZIPCODE.test(zipcode)) {
      setNumberError('Invalid Zipcode')
      return
    }
    obj.mobileNo = obj.mobileNo.split('-').join('')
    obj.telNo = obj.telNo.split('-').join('')
    obj.zipcode = obj.zipcode.split('-').join('')

    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do You want to make changes') === true) {
      await axios.patch('/api/organization', obj, {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      navigate('/forms/people-table/')
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
  const getData = async () => {
    const response = await axios.get('/api/state', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data1 = response.data.data[0]
    setState([...state, ...data1])
  }
  useEffect(() => {
    if (Data === 'edit') {
      const data = location.state
      console.log(data)
      setPlaceholder({ ...placeholder, ...data })
    }
    if (Data === 'add') {
      const obj = {
        firstName: 'Enter First Name',
        middleName: 'Enter Middle Name',
        lastName: 'Enter Last Name',
        address1: 'Enter Address1',
        address2: 'Enter Address2',
        city: 'Enter City',
        stateID: 'Please select StateID',
        zipcode: 'Enter Zipcode',
        telNo: 'Enter Telephone No',
        mobileNo: 'Enter Mobile No',
        email: 'Enter Email',
      }
      setPlaceholder({ ...placeholder, ...obj })
    }

    getData()
  }, [])
  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 col-8 m-auto">
            <CCardHeader className="text-center">
              <strong>Individual</strong>
            </CCardHeader>
            <CCardBody>
              <DocsExample href="forms/form-control">
                <CForm>
                  <CFormLabel htmlFor="firstName">
                    First Name<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder={placeholder.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {numberError === 'Invalid firstName' && (
                      <p style={{ color: 'red' }}>Invalid firstName</p>
                    )}
                  </CInputGroup>
                  <CFormLabel htmlFor="middleName">
                    Middle Name<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="middleName"
                      name="middleName"
                      placeholder={placeholder.middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      // value={formValues.lastName}
                    />
                    {numberError === 'Invalid middleName' && (
                      <p style={{ color: 'red' }}>Invalid middleName</p>
                    )}
                  </CInputGroup>
                  <CFormLabel htmlFor="lastName">
                    Last Name<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder={placeholder.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      // value={formValues.lastName}
                    />
                    {numberError === 'Invalid lastName' && (
                      <p style={{ color: 'red' }}>Invalid lastName</p>
                    )}
                  </CInputGroup>
                  <CFormLabel htmlFor="address">
                    Address1<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormTextarea
                      id="address"
                      name="address1"
                      rows="3"
                      placeholder={placeholder.address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    ></CFormTextarea>
                  </CInputGroup>
                  <CFormLabel htmlFor="address">Address2</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLocationPin} />
                    </CInputGroupText>
                    <CFormTextarea
                      id="address"
                      rows="3"
                      placeholder={placeholder.address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    ></CFormTextarea>
                  </CInputGroup>
                  <CFormLabel htmlFor="city">
                    City<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="city"
                      name="city"
                      placeholder={placeholder.city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {numberError === 'Invalid city' && <p style={{ color: 'red' }}>Invalid city</p>}
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
                  <CFormLabel htmlFor="zipcode">
                    ZipCode<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCircle} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="zipcode"
                      minLength={9}
                      maxLength={9}
                      placeholder={placeholder.zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      onBlur={handleZip}
                    />
                  </CInputGroup>
                  {numberError === 'Invalid Zipcode' && (
                    <p style={{ color: 'red' }}>Invalid Zipcode</p>
                  )}
                  <CFormLabel htmlFor="tel">
                    Tel No.<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="tel"
                      maxLength={10}
                      minLength={10}
                      placeholder={placeholder.telNo}
                      onChange={(e) => setTelNo(e.target.value)}
                      onBlur={handleNumber}
                    />
                  </CInputGroup>
                  {numberError === 'Invalid Number' && (
                    <p style={{ color: 'red' }}>Invalid number</p>
                  )}
                  <CFormLabel htmlFor="mobile">
                    Mobile No.<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilMobile} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      id="mobile"
                      maxLength={10}
                      minLength={10}
                      placeholder={placeholder.mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      onBlur={handleNumber}
                    />
                  </CInputGroup>

                  {numberError === 'Invalid Number' && (
                    <p style={{ color: 'red' }}>Invalid number</p>
                  )}
                  {Data === 'add' && (
                    <>
                      <CFormLabel htmlFor="email">
                        Email<span style={{ color: 'red' }}>*</span>
                      </CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          type="email"
                          id="email"
                          placeholder={placeholder.email}
                          autoComplete="new-email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
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
                      <CFormLabel htmlFor="password">
                        Password<span style={{ color: 'red' }}>*</span>
                      </CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="password"
                          placeholder="Enter Password"
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CFormLabel htmlFor="password1">
                        Confirm Password<span style={{ color: 'red' }}>*</span>
                      </CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          id="password1"
                          placeholder="Confirm Password"
                          onChange={(e) => setCpass(e.target.value)}
                        />
                      </CInputGroup>
                      {passMatch !== false && (
                        <p style={{ color: 'red' }}>Passwords does not match </p>
                      )}
                      {errorMessage === 'Invalid Password' && (
                        <p style={{ color: 'red' }}>
                          8 to 24 characters.
                          <br />
                          Must include uppercase and lowercase letters, a number and aspecial
                          character.
                          <br />
                          Allowed special characters: <span aria-label="exclamation mark">!</span>
                          <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                          <span aria-label="dollar-sign">$</span>{' '}
                          <span aria-label="percentage">%</span>
                        </p>
                      )}
                    </>
                  )}
                  <CFormLabel htmlFor="mobile">
                    Gender<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <div id="form-check">
                    <input type="radio" name="form-check" id="flexRadioDefault1" value="Male" />
                    Male
                    <br />
                    <input type="radio" name="form-check" id="flexRadioDefault2" value="Female" />
                    Female
                    <br />
                    <input type="radio" name="form-check" id="flexRadioDefault2" value="Other" />
                    Other
                    <br />
                  </div>
                  {errorMessage === null && (
                    <span id="fail-message" style={{ color: 'red' }}>
                      Please fill all field(s)
                    </span>
                  )}
                  <div className="gap-2 d-md-flex justify-content-md-center">
                    {Data === 'add' && <CButton onClick={addPeople}>Submit</CButton>}
                    {Data === 'edit' && <CButton onClick={editPeople}>Submit</CButton>}

                    <Link to="/forms/people-table/">
                      <CButton>Cancel</CButton>
                    </Link>
                  </div>
                </CForm>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default FormControl
