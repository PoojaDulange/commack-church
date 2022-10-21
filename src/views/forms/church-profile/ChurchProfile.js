import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import axios from '../../../axios.js'
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import { UserContext } from '../../../context/UserContext.js'

const ChurchProfile = () => {
  const token = useContext(UserContext)
  const [data, setData] = useState({})
  const getData = async () => {
    const response = await axios.get('/api/church', {
      headers: {
        Authorization: `Bearer ${token.user}`,
      },
    })

    const data1 = response.data.data[0]
    const p1 = data1[0].zipcode.substr(0, 5) + '-'
    const p2 = data1[0].zipcode.substr(5)
    data1[0].zipcode = p1 + p2
    const part1 = data1[0].mobileNo.substr(0, 3) + '-'
    const part2 = data1[0].mobileNo.substr(3, 3) + '-'
    const part3 = data1[0].mobileNo.substr(6)
    data1[0].mobileNo = part1 + part2 + part3
    setData((prevState) => ({ ...prevState, ...data1[0] }))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <CCard style={{ width: '70%', margin: 'auto', height: 'auto' }}>
        <CCardImage
          className="flex justify-content-center m-auto mt-4"
          src="https://images.unsplash.com/photo-1555696958-c5049b866f6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          style={{ width: '50%', height: '25%' }}
        />
        <CCardBody>
          <CCardTitle>{data.name}</CCardTitle>
          <CCardText>{data.description}</CCardText>
        </CCardBody>
        <CListGroup flush>
          <CListGroupItem>{data.address1}</CListGroupItem>
          <CListGroupItem>{data.address2}</CListGroupItem>
          <CListGroupItem>{data.city}</CListGroupItem>
          <CListGroupItem>{data.stateID}</CListGroupItem>
          <CListGroupItem>{data.zipcode}</CListGroupItem>
          <CListGroupItem>{data.mobileNo}</CListGroupItem>
          <CListGroupItem>
            <a href="mailto:Yd@gmail.com">{data.email}</a>
          </CListGroupItem>
          <CListGroupItem>
            <a href=" url:https://www.yourdestiny.church/">{data.churchURL}</a>
          </CListGroupItem>
        </CListGroup>

        <CCardBody>
          <div className="gap-1 d-md-flex justify-content-md-center">
            <Link to="/forms/church-edit">
              <CButton className="btn btn-primary ">Edit</CButton>
            </Link>
            <span> </span>
            <Link to="/dashboard1">
              {' '}
              <CButton className="btn btn-primary">Cancel</CButton>
            </Link>
          </div>
          {/* <CCardLink href="#">Another link</CCardLink> */}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ChurchProfile
