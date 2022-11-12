import React, { useEffect, useContext } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'src/axios'
import { UserContext } from 'src/context/UserContext'
import { useState } from 'react'

const WidgetsDropdown = () => {
  const [length, setLength] = useState([])
  const token = useContext(UserContext)
  const getData = async () => {
    const response = await axios.get('/api/organization', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    setLength((length) => [...length, response.data.data[0].length + 1])

    const response1 = await axios.get('/api/people', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    setLength((length) => [...length, response1.data.data[0].length + 1])

    const response2 = await axios.get('/api/contribution', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const arr = response2.data.data[0]
    let sum = 0
    arr.map((data) => {
      sum = sum + data.pledgeAmount
    })
    sum = sum.toFixed(2)
    console.log(sum)
    // eslint-disable-next-line no-restricted-globals
    setLength((length) => [...length, sum])

    const response3 = await axios.get('/api/pledgecategory', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    setLength((length) => [...length, response3.data.data[0].length + 1])
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <Link to="/forms/organization-table/" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            className="my-4"
            color="secondary"
            value={<h4 className="my-3">#{length[0]}</h4>}
            title={<h4 className="my-3">Organization</h4>}
          />
        </Link>
      </CCol>
      <CCol sm={6} lg={3}>
        <Link to="/forms/people-table/" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            className="my-4"
            color="info"
            value={<h4 className="my-3">#{length[1]}</h4>}
            title={<h4 className="my-3">Individual</h4>}
          />
        </Link>
      </CCol>
      <CCol sm={6} lg={3}>
        <Link to="/forms/contribution-table" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            className="my-4"
            color="warning"
            value={<h4 className="my-3">${length[2]}</h4>}
            title={<h4 className="my-3">Contribution</h4>}
          />
        </Link>
      </CCol>
      <CCol sm={6} lg={3}>
        <Link to="/forms/pledged-category/" style={{ textDecoration: 'none' }}>
          {' '}
          <CWidgetStatsA
            className="my-4"
            color="danger"
            value={<h4 className="my-3">#{length[3]}</h4>}
            title={<h4 className="my-3">Pledged Categories</h4>}
          />
        </Link>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
