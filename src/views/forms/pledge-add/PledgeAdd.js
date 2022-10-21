import React, { useState, useEffect, useContext } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormInput,
  CButton,
  CFormTextarea,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilCircle, cilList } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from '../../../axios.js'
import { UserContext } from '../../../context/UserContext.js'

const PledgeAdd = () => {
  const token = useContext(UserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState(0)
  const navigate = useNavigate()
  const [editData, setEditData] = useState({})
  const getByID = async (id) => {
    console.log(id)
    setId(id)
    let d = await axios.get(`/api/pledgecategory/${id}`, {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    setEditData(d.data.data[0])
  }
  useEffect(() => {
    let i = localStorage.getItem('pledgeID')
    if (i !== null) {
      getByID(i)
    }
  }, [])
  const addPledge = async () => {
    const obj = { name, description, id }
    if (obj.name === '' || obj.description === '') {
      document.querySelector('#fail-message').innerHTML = 'Please fill out field(s)'
      return
    }
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do You want to make changes') === true) {
      if (id === 'null') {
        await axios
          .post('/api/pledgecategory/', obj, {
            headers: { Authorization: `Bearer ${token.user}` },
          })
          .then(function (res) {})
          .catch(function (err) {
            console.log(err)
          })
        navigate('/forms/pledged-category')
      } else {
        try {
          await axios.patch('/api/pledgecategory', obj, {
            headers: { Authorization: `Bearer ${token.user}` },
          })
          navigate('/forms/pledged-category')
        } catch (err) {
          console.log(err)
        }
      }
    } else {
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 col-8 m-auto">
          <CCardHeader className="text-center">
            <strong>Pledge Form</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CFormLabel htmlFor="name">
                Pledge Name<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilCircle} />
                </CInputGroupText>
                <CFormInput
                  type="text"
                  id="name"
                  placeholder={id === 'null' ? 'Enter Pledge Name' : editData.name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  value={name}
                  required
                />
              </CInputGroup>
              <CFormLabel htmlFor="description">
                Description<span style={{ color: 'red' }}>*</span>
              </CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilList} />
                </CInputGroupText>
                <CFormTextarea
                  id="description"
                  rows="3"
                  placeholder={id === 'null' ? 'Enter Description' : editData.description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  value={description}
                  required
                ></CFormTextarea>
              </CInputGroup>
              <span id="fail-message" style={{ color: 'red' }}></span>

              <div className="d-md-flex justify-content-md-center gap-2">
                <CButton type="submit" onClick={addPledge}>
                  Submit
                </CButton>
                <Link to="/forms/pledged-category/">
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

export default PledgeAdd
