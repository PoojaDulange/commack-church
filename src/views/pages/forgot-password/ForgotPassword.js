import React from 'react'
import { Link } from 'react-router-dom'
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

const ForgotPassword = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center" style={{ width: '100%', height: 'auto' }}>
          <CCol md={8}>
            <CCardGroup style={{ width: '100%', height: 'auto' }}>
              <CCard style={{ width: '100%', height: 'auto' }}>
                <CCardHeader className="text-center">
                  <h3>ForgotPassword</h3>
                </CCardHeader>
                <CCardBody>
                  <CForm>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput type="Email" placeholder="Email" autoComplete="current-email" />
                    </CInputGroup>
                    <div className="d-md-flex justify-content-md-center gap-2 ">
                      <Link to="/newpassword" style={{ textDecoration: 'none' }}>
                        <CButton color="primary">Send</CButton>
                      </Link>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                        <CButton color="primary">Cancel</CButton>
                      </Link>
                    </div>
                    <CRow>
                      <CCol xs={6} className="text-right"></CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default ForgotPassword
