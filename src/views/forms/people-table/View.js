/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardTitle, CListGroup, CListGroupItem } from '@coreui/react'

const View = (props) => {
  const data = JSON.parse(localStorage.getItem('row'))
  console.log(data)
  return (
    <div className="mt-5">
      <CCard style={{ width: '50%', margin: 'auto', height: 'auto' }}>
        <CCardBody>
          <CCardTitle>Name: {data.name}</CCardTitle>
        </CCardBody>
        <CListGroup flush>
          <CListGroupItem>
            <strong>City:</strong> {data.city}
          </CListGroupItem>
          <CListGroupItem>
            <strong>State:</strong> {data.stateID}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Zipcode:</strong> {data.zipCode}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Address:</strong> {data.address1}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Tel No.:</strong> {data.telNo}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Mobile No.:</strong> {data.mobileNo}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Gender:</strong> {data.gender}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Email:</strong> {data.email}
          </CListGroupItem>
        </CListGroup>
        <CCardBody className="gap-1 d-md-flex justify-content-md-center">
          <Link to="/forms/people-table">
            <CButton className="btn btn-primary">Done</CButton>
          </Link>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default View
