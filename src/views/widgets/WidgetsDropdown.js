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
  }
  useEffect(() => {
    getData()
    console.log(length)
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
            value={<h4 className="my-3">#1500</h4>}
            title={<h4 className="my-3">Individual</h4>}
          />
        </Link>
      </CCol>
      <CCol sm={6} lg={3}>
        <Link to="/forms/contribution-table" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            className="my-4"
            color="warning"
            value={<h4 className="my-3">$2000</h4>}
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
            value={<h4 className="my-3">#3</h4>}
            title={<h4 className="my-3">Pledged Categories</h4>}
          />
        </Link>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
