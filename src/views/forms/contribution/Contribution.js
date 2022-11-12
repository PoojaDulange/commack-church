import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import DataTable from 'react-data-table-component'
import axios from 'src/axios'
import { UserContext } from '../../../context/UserContext.js'

const Contribution = () => {
  const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s
  const [amount, setAmount] = useState('')
  const location = useLocation()

  const token = useContext(UserContext)

  const navigate = useNavigate()
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])

  const [user, setUser] = useState([])
  const [pCategory, setPCategory] = useState([])
  const [data, setData] = useState([])
  const [orgData, setOrgData] = useState([])

  const [org, setOrg] = useState(false)
  const [individual, setIndividual] = useState(false)

  const handleOrgChange = () => {
    setIndividual(false)
    setOrg(true)
  }
  const handleIndChange = () => {
    setOrg(false)
    setIndividual(true)
  }
  const column = [
    {
      name: <strong>User Name</strong>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <strong>Contribution Date</strong>,
      selector: (row) => row.contributionDate,
    },
    {
      name: <strong>PledgedCategory</strong>,
      selector: (row) => row.category,
    },
    {
      name: <strong>Comments</strong>,
      selector: (row) => row.Comments,
    },
    {
      name: <strong>Pledged Amount ($)</strong>,
      selector: (row) => <p className="align-center">{row.PledgedAmount}</p>,
      right: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex justify-content-between gap-3">
          <button
            className="btn btn-primary"
            style={{ width: '4em', height: 'auto' }}
            onClick={(e) => handleClick(row, e)}
          >
            Edit
          </button>

          <Link to="/forms/contribution-table">
            <button
              className="btn btn-primary"
              style={{ width: '5em', height: 'auto' }}
              onClick={async () => {
                await axios.delete(`/api/contribution/${row.contributionID}`, {
                  headers: { Authorization: `Bearer ${token.user}` },
                })
                window.reload()
              }}
            >
              Delete
            </button>
          </Link>
        </div>
      ),
    },
  ]
  const customStyles = {
    rows: {
      style: { marginTop: '10px', width: '100%' },
    },
    DataTable: {
      style: { color: 'red', width: '100%' },
    },
    columns: {
      style: { wrap: true },
    },
    headCells: {
      style: { background: 'black', color: 'white' },
    },
  }
  const addList = async () => {
    if (org | individual) {
      let organizationID, peopleID
      const chResponse = await axios.get('/api/church', {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      const churchData = chResponse.data.data[0]
      const name = document.getElementById('name').value
      const date = document.getElementById('date').value
      const category = document.getElementById('category').value
      const comment = document.getElementById('comments').value
      const amt = document.getElementById('amount').value
      if (name === '' || date === '' || category === '' || comment === '' || amt === '') {
        alert('Please fill all data')
        return
      }
      if (org === true) {
        const response = await axios.get(`/api/organization/name/${name}`, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        organizationID = response.data.data[0].organizationID
        peopleID = null
      }
      if (individual === true) {
        const email = document.getElementById('email').value
        const response = await axios.get(`/api/people/email/${email}`, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        console.log(response)
        peopleID = response.data.data[0].peopleID
        organizationID = null
      }
      const pledgeResponse = await axios.get('/api/pledgecategory', {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      const pledgeData = pledgeResponse.data.data[0]
      const filteredPledge = pledgeData.filter((data) => {
        return data.name === category
      })
      const obj = {
        organizationID,
        peopleID,
        churchID: churchData[0].churchID,
        contributionDate: date,
        category: category,
        comments: comment,
        pledgeAmount: parseFloat(amt).toFixed(2),
        pledgeID: filteredPledge[0].pledgeID,
      }
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Do You want to make changes') === true) {
        try {
          await axios.post('/api/contribution', obj, {
            headers: { Authorization: `Bearer ${token.user}` },
          })
          getData()
          document.getElementById('comments').value = ''
          setAmount('')
          document.getElementById('email').setAttribute('disabled', true)
        } catch (err) {}
      } else {
      }
    } else {
      alert('Please Select the radio button')
    }
  }
  const handleClick = (row, e) => {
    e.preventDefault()
    localStorage.setItem('user', 'edit')
    if (org === true) {
      navigate('/forms/contribution-form/', { state: { row, type: 'org' } })
    }
    if (individual === true) {
      navigate('/forms/contribution-form/', { state: { row, type: 'ind' } })
    }
  }
  const getDate = () => {
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

  const getData = async () => {
    setData([])
    setOrgData([])
    if (org === true) {
      setUser([])
      setData1([])

      const response = await axios.get('/api/organization', {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      const user1 = response.data.data[0]
      user1.map((data) => {
        setUser((user) => [...user, data.name])
      })
    }
    if (individual === true) {
      setUser([])
      setData1([])

      const response = await axios.get('/api/people', {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      const user1 = response.data.data[0]
      user1.map((data) => {
        setUser((user) => [
          ...user,
          { email: data.email, name: data.firstName + ' ' + data.lastName },
        ])
      })
    }
    let name
    const response = await axios.get('/api/contribution', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const cData = response.data.data[0]
    cData.reverse().map(async (cData) => {
      const date = cData.contributionDate.split('T')[0]
      if (org === true) {
        const response = await axios.get(`/api/organization/${cData.organizationID}`, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        const array = response.data.data[0]
        name = array.name
      }
      if (individual === true) {
        const response = await axios.get(`/api/people/${cData.peopleID}`, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        const array = response.data.data[0]
        name = array.firstName
      }
      const filteredData = pCategory.filter((data) => {
        return cData.pledgeID === data.pledgeID
      })
      const obj = {
        contributionID: cData.contributionID,
        name,
        contributionDate: date,
        category: filteredData[0].name,
        Comments: cData.comments,
        PledgedAmount: parseFloat(cData.pledgeAmount).toFixed(2),
      }
      if (individual === true) {
        setData((data) => [...data, obj])
      }
      if (org === true) {
        setOrgData((orgData) => [...orgData, obj])
      }
    })
  }
  const display = async () => {
    const response1 = await axios.get('/api/pledgecategory', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const pledge = response1.data.data[0]
    console.log(pledge)
    setPCategory([...pCategory, ...pledge])
  }
  useEffect(() => {
    // if (location.state) {
    //   if (location.state.type === 'org') {
    //     setOrg(true)
    //   }
    //   if (location.state.type === 'ind') {
    //     setOrg(true)
    //   }
    // }
    display()
    getDate()
    if (!location.state) {
      alert('Please select radio button(organization/Individual) before proceeding further')
    }
  }, [])
  useEffect(() => {
    getData()
    setData1((data1) => [data1, ...orgData])
    setData2((data2) => [data2, ...data])
  }, [org, individual])
  const handleChange = (e) => {
    const value = e.target.value.match(regex)[0]
    console.log(value)
    setAmount(value)
  }
  return (
    <div className="text-center">
      <CRow className="justify-content-center mb-3">
        <CCol xs={6} className="mb-2 mt-3 d-flex gap-3">
          <CFormCheck
            type="radio"
            name="flexRadioDefault1"
            id="flexRadioDefault1"
            label="Organization"
            value="organization"
            onChange={handleOrgChange}
            checked={org}
          />
          <CFormCheck
            type="radio"
            name="flexRadioDefault2"
            id="flexRadioDefault2"
            label="Individual"
            value="individual"
            onChange={handleIndChange}
            checked={individual}
          />
        </CCol>
      </CRow>
      <div>
        <CListGroup>
          <CListGroupItem>
            <CInputGroup
              className="d-flex justify-content-between gap-3 "
              style={{ width: '100%', height: 'auto' }}
            >
              {individual === true && (
                <>
                  <select
                    className="form-select"
                    aria-label="Select Name"
                    id="name"
                    onChange={() => {
                      document.getElementById('email').removeAttribute('disabled')
                    }}
                    style={{ width: '10em', height: 'auto' }}
                  >
                    {user.map((data, index) => {
                      return (
                        <option key={index} value={data.name}>
                          {data.name}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    className="form-select"
                    aria-label="Select Email"
                    id="email"
                    disabled
                    style={{ width: '10em', height: 'auto' }}
                  >
                    {user.map((data, index) => {
                      return (
                        <option key={index} value={data.email}>
                          {data.email}
                        </option>
                      )
                    })}
                  </select>
                </>
              )}
              {org === true && (
                <select
                  className="form-select"
                  aria-label="Select Name"
                  style={{ width: '10em', height: 'auto' }}
                  id="name"
                >
                  {user.map((data, index) => {
                    return (
                      <option key={index} value={data}>
                        {data}
                      </option>
                    )
                  })}
                </select>
              )}
              <CFormInput
                type="date"
                id="date"
                style={{ width: '10em', height: 'auto' }}
                required
              />
              <select
                className="form-select"
                aria-label="Select category"
                id="category"
                style={{ width: '10em', height: 'auto' }}
              >
                <option>Select category</option>
                {pCategory.map((data, index) => {
                  return (
                    <option key={index} value={data.name}>
                      {data.name}
                    </option>
                  )
                })}
              </select>
              <CFormInput
                type="text"
                id="comments"
                placeholder="Enter Comments"
                style={{ width: '10em', height: 'auto' }}
                required
              />
              <CFormInput
                type="text"
                id="amount"
                placeholder="Enter Pledge Amount"
                value={amount}
                style={{ width: '10em', height: 'auto' }}
                onChange={handleChange}
                required
              />
              <CButton type="submit" onClick={addList} style={{ width: '10em', height: 'auto' }}>
                Add
              </CButton>
            </CInputGroup>
          </CListGroupItem>
        </CListGroup>
      </div>
      {org === true && <DataTable columns={column} data={orgData} customStyles={customStyles} />}
      {individual === true && (
        <DataTable columns={column} data={data} customStyles={customStyles} />
      )}
    </div>
  )
}

export default Contribution
