import React, { useState } from 'react'
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
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'

const NewPassword = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center w-100" style={{ width: '100%', height: 'auto' }}>
          <CCol md={8}>
            <CCardGroup style={{ width: '100%', height: 'auto' }}>
              <CCard style={{ width: '100%', height: 'auto' }}>
                <CCardHeader className="text-center">
                  <h3>New Password</h3>
                </CCardHeader>
                <CCardBody>
                  <CForm>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Password" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Re-enter Password" />
                    </CInputGroup>
                    <div className="d-md-flex justify-content-md-center gap-2 ">
                      <Link to="/" style={{ textDecoration: 'none' }}>
                        <CButton color="primary" onclick={() => setVisible(true)}>
                          Ok
                        </CButton>
                      </Link>
                      <CAlert
                        color="primary"
                        dismissible
                        visible={visible}
                        onClose={() => setVisible(false)}
                      >
                        Password Reset successfully!
                      </CAlert>
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
export default NewPassword
