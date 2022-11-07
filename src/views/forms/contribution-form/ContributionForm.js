/* eslint-disable no-restricted-globals */
import React, { useEffect, useState, useContext } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilList, cilCalendar, cilMoney, cilUser } from '@coreui/icons'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from '../../../axios.js'
import { UserContext } from '../../../context/UserContext.js'

const Contribution = () => {
  const token = useContext(UserContext)

  const [churchID, setChurchID] = useState()
  const user = localStorage.getItem('user')
  const location = useLocation()
  const navigate = useNavigate()
  const [pledge, setPledge] = useState([])
  const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s

  const getDate = async () => {
    const response1 = await axios.get('/api/church', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const church = response1.data.data[0]
    setChurchID(church[0].churchID)

    const response = await axios.get('/api/pledgecategory', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data1 = response.data.data[0]
    setPledge([...pledge, ...data1])

    let todaydate = new Date()
    var day = todaydate.getDate()
    var month = todaydate.getMonth() + 1
    if (day < 10) {
      day = '0' + day
    }
    if (month < 10) {
      month = '0' + month
    }
    var year = todaydate.getFullYear()
    var datestring = year + '-' + month + '-' + day
    document.getElementById('date').value = datestring
  }
  useEffect(() => {
    getDate()
  }, [])

  const [p_category, setP_category] = useState('')
  const [date, setDate] = useState('')
  const [comment, setComment] = useState('')
  const [amount, setAmount] = useState('')

  const handleClick = async () => {
    // console.log(document.getElementById('comment').value)
    const data1 = location.state.row
    if (p_category === '') {
      document.querySelector('#fail-message').innerHTML = 'Please fill out field(s)'
      return
    }
    const pledgeCategory = pledge.filter((data) => {
      return p_category === data.name
    })
    let peopleID, organizationID
    if (user === 'org') {
      organizationID = data1.organizationID
      peopleID = null
    }
    if (user === 'ind') {
      peopleID = data1.peopleID
      organizationID = null
    }
    const obj = {
      organizationID,
      peopleID,
      churchID,
      contributionDate: document.getElementById('date').value,
      comments: comment,
      pledgeAmount: amount,
      pledgeID: pledgeCategory[0].pledgeID,
    }
    if (obj.comments === '' || obj.pledgeAmount === '') {
      document.querySelector('#fail-message').innerHTML = 'Please fill out field(s)'
      return
    }
    if (confirm('Do You want to make changes') === true) {
      try {
        await axios.post('/api/contribution', obj, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        if (user === 'org') {
          navigate('/forms/organization-table/')
        }
        if (user === 'ind') {
          navigate('/forms/people-table/')
        }
      } catch (err) {
        console.log(err)
      }
    } else {
    }
  }
  const handleChange = (e) => {
    const value = e.target.value.match(regex)[0]
    console.log(value)
    setAmount(value)
  }
  const handleEdit = async () => {
    let peopleID, organizationID
    if (location.state.type === 'org') {
      peopleID = null
      const response = await axios.get(`/api/organization/name/${location.state.row.name}`, {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      organizationID = response.data.data[0].organizationID
    }
    if (location.state.type === 'ind' && user === 'ind') {
      organizationID = null
      const response = await axios.get(`/api/people/name/${location.state.row.firstName}`, {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      console.log(response)
      peopleID = response.data.data[0].peopleID
    }
    if (location.state.type === 'ind' && user === 'edit') {
      organizationID = null
      const response = await axios.get(`/api/people/name/${location.state.row.name}`, {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      console.log(response)
      peopleID = response.data.data[0].peopleID
    }
    if (p_category === '') {
      document.querySelector('#fail-message').innerHTML = 'Please fill out field(s)'
      return
    }
    const pledgeCategory = pledge.filter((data) => {
      return p_category === data.name
    })
    const obj = {
      contributionID: location.state.row.contributionID,
      organizationID,
      peopleID,
      churchID,
      contributionDate: document.getElementById('date').value,
      comments: comment,
      pledgeAmount: amount,
      pledgeID: pledgeCategory[0].pledgeID,
    }
    console.log(obj)
    if (obj.comments === '' || obj.pledgeAmount === '') {
      document.querySelector('#fail-message').innerHTML = 'Please fill out field(s)'
      return
    }
    if (confirm('Do You want to make changes') === true) {
      try {
        await axios.patch('/api/contribution', obj, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        navigate('/forms/contribution/')
      } catch (err) {
        console.log(err)
      }
    } else {
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 col-8 m-auto">
          <CCardHeader className="text-center">
            <strong>Contribution</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CFormLabel htmlFor="name">
                UserName<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                {user === 'edit' && (
                  <CFormInput
                    type="text"
                    id="name"
                    placeholder={location.state.row.name}
                    disabled
                  />
                )}
                {location.state.type === 'org' && user === 'org' && (
                  <CFormInput
                    type="text"
                    id="name"
                    placeholder={location.state.row.name}
                    disabled
                  />
                )}
                {location.state.type === 'ind' && user === 'ind' && (
                  <CFormInput
                    type="text"
                    id="name"
                    placeholder={location.state.row.firstName}
                    disabled
                  />
                )}
              </CInputGroup>
              <CFormLabel htmlFor="date">
                Contribution Date<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCalendar} />
                </CInputGroupText>
                <CFormInput
                  type="date"
                  id="date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </CInputGroup>
              <CFormLabel htmlFor="name">
                Pledge Category Name<span style={{ color: 'red' }}>*</span>
              </CFormLabel>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilList} />
                </CInputGroupText>
                <select
                  className="form-select"
                  onChange={(e) => setP_category(e.target.value)}
                  aria-label="Default select example"
                  required
                >
                  <option value="">Please select category</option>

                  {pledge.map((state, index) => {
                    return (
                      <option key={index} value={state.name}>
                        {state.name}
                      </option>
                    )
                  })}
                </select>
              </CInputGroup>

              {(user === 'org' || user === 'ind') && (
                <>
                  {' '}
                  <CFormLabel htmlFor="comment">
                    Comments <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilList} />
                    </CInputGroupText>

                    <CFormTextarea
                      id="comment"
                      rows="3"
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></CFormTextarea>
                  </CInputGroup>
                  <CFormLabel htmlFor="amount">
                    Plegded Amount<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilMoney} />
                    </CInputGroupText>

                    <CFormInput
                      type="text"
                      id="amount"
                      value={amount}
                      placeholder="Enter Pledged Amount"
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                </>
              )}
              {user === 'edit' && (
                <>
                  <CFormLabel htmlFor="comment">
                    Comments <span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilList} />
                    </CInputGroupText>

                    <CFormTextarea
                      id="comment"
                      rows="3"
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={location.state.row.Comments}
                      required
                    ></CFormTextarea>
                  </CInputGroup>
                  <CFormLabel htmlFor="amount">
                    Plegded Amount<span style={{ color: 'red' }}>*</span>
                  </CFormLabel>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilMoney} />
                    </CInputGroupText>

                    <CFormInput
                      type="text"
                      id="amount"
                      placeholder={location.state.row.PledgedAmount}
                      value={amount}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                </>
              )}
              <span id="fail-message" style={{ color: 'red' }}></span>
              {user === 'org' && (
                <div className="gap-2 d-md-flex justify-content-md-center">
                  <CButton onClick={handleClick}>Submit</CButton>
                  <Link to="/forms/organization-table/">
                    <CButton>Cancel</CButton>
                  </Link>
                </div>
              )}

              {user === 'ind' && (
                <div className="gap-2 d-md-flex justify-content-md-center">
                  <CButton onClick={handleClick}>Submit</CButton>
                  <Link to="/forms/people-table/">
                    <CButton>Cancel</CButton>
                  </Link>
                </div>
              )}
              {user === 'edit' && (
                <div className="gap-2 d-md-flex justify-content-md-center">
                  <CButton onClick={handleEdit}>Submit</CButton>

                  <Link to="/forms/contribution/">
                    <CButton>Cancel</CButton>
                  </Link>
                </div>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Contribution
