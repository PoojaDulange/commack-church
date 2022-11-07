import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import image from '../../../assets/images/Login.png'
import axios from '../../../axios.js'
import { UserContext } from '../../../context/UserContext.js'

const Login = () => {
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()
  const [login, setLogin] = useState(true)
  const [credentials, setCredentials] = useState({
    condition: false,
    field: null,
  })

  const handleClick = async () => {
    if (
      document.getElementById('email').value === '' ||
      document.getElementById('password').value === ''
    ) {
      console.log('One field is empty')
      if (
        document.getElementById('email').value === '' &&
        document.getElementById('password').value === ''
      ) {
        setCredentials({
          condition: true,
          field: 'Email & Password',
        })
      } else {
        if (
          document.getElementById('email').value === '' &&
          document.getElementById('password').value !== ''
        ) {
          setCredentials({
            condition: true,
            field: 'Email',
          })
        } else {
          if (
            document.getElementById('email').value !== '' &&
            document.getElementById('password').value === ''
          ) {
            setCredentials({
              condition: true,
              field: 'Password',
            })
          }
        }
      }
    } else {
      setCredentials({
        condition: false,
        field: null,
      })
      try {
        const obj = {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
        }

        const response = await axios.post('/api/users/login', obj)
        // console.log(response)
        setLogin(true)
        dispatch({ type: 'Login', payload: response.data.token })
        navigate('/dashboard1')
      } catch (err) {
        console.log(err)
        setLogin(false)
      }
    }
  }
  return (
    <UserContext.Provider>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center" style={{ width: '100%', height: 'auto' }}>
            <CCol md={8}>
              <CCardGroup style={{ width: '100%', height: 'auto' }}>
                <CCard style={{ width: '100%', height: 'auto' }}>
                  <CCardHeader className="text-center">
                    <h3>Login</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="mt-5">
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput id="email" placeholder="Email" required />
                        {}
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput id="password" type="password" placeholder="Password" required />
                      </CInputGroup>
                      {!login && <p style={{ color: 'red' }}>Please check your credentials</p>}
                      {credentials.condition && (
                        <p style={{ color: 'red' }}>Please Fill {credentials.field} fields</p>
                      )}
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={handleClick}>
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>
                            <CButton color="link" className="px-0 text-decoration-none">
                              Forgot password?
                            </CButton>
                          </Link>
                        </CCol>
                        <CCol>
                          <p className="py-5">
                            New User?
                            <Link to="/register" className="text-decoration-none">
                              {' '}
                              Register
                            </Link>
                          </p>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-black py-5 content center"
                  style={{ width: '100%', height: 'auto' }}
                >
                  <CCardBody
                    className="text-center m-auto"
                    style={{ display: 'flex' }}
                    justify-content-center
                  >
                    <div className="m-auto">
                      <img className="w-100" src={image} alt="Login" />
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </UserContext.Provider>
  )
}

export default Login
