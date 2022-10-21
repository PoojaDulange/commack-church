import React from 'react'
import img from '../../../assets/images/website.png'
import { CButton, CCol, CContainer, CRow } from '@coreui/react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer className=" d-flex justify-content-center flex ">
        <CRow>
          <CCol lg={12}>
            <div className="text-center">
              <Link to="/">
                <img src={img} alt="under construction" style={{ width: '100%', heigth: 'auto' }} />
              </Link>
            </div>
            <div className="text-center my-5">
              <Link to="/">
                <CButton>Back</CButton>
              </Link>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
