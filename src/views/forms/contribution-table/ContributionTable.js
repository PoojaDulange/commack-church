import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import DataTable from 'react-data-table-component'
import ExcelJS from 'exceljs'
import axios from '../../../axios.js'
import { UserContext } from '../../../context/UserContext.js'

const ContributionTable = () => {
  const token = useContext(UserContext)

  const [search, setSearch] = useState('')
  const [filteredChurches, setFilteredChurches] = useState([])
  const [data, setData] = useState([])

  const customStyles = {
    headCells: {
      style: { background: 'black', color: 'white' },
    },
  }
  const column = [
    {
      name: <strong>User Name</strong>,
      selector: (row) => row.userName,
      sortable: true,
    },
    {
      name: <strong>Contribution Date</strong>,
      selector: (row) => row.contributionDate,
    },
    {
      name: <strong>PleadgeCategory</strong>,
      selector: (row) => row.category,
    },
    {
      name: <strong>Comments</strong>,
      selector: (row) => row.comments,
    },
    {
      name: <strong>Pledged Amount ($)</strong>,
      selector: (row) => <p className="align-center">{row.PledgedAmount}</p>,
      right: true,
    },
  ]

  async function getData() {
    try {
      const response = await axios.get('/api/contribution', {
        headers: { Authorization: `Bearer ${token.user}` },
      })
      const data1 = response.data.data[0]
      let userName, contributionDate
      data1.reverse().map(async (data1) => {
        const pID = data1.pledgeID

        const pledgeData = await axios.get(`/api/pledgecategory/${pID}`, {
          headers: { Authorization: `Bearer ${token.user}` },
        })
        const pledgeName = pledgeData.data.data[0].name
        const date = data1.contributionDate
        const comments = data1.comments
        contributionDate = date.split('T')[0]
        if (data1.organizationID !== null) {
          const response = await axios.get(`/api/organization/${data1.organizationID}`, {
            headers: { Authorization: `Bearer ${token.user}` },
          })
          userName = response.data.data[0].name
        }
        if (data1.peopleID !== null) {
          const response = await axios.get(`/api/people/${data1.peopleID}`, {
            headers: { Authorization: `Bearer ${token.user}` },
          })
          userName = response.data.data[0].firstName
        }
        const obj = {
          userName,
          contributionDate,
          category: pledgeName,
          comments,
          PledgedAmount: data1.pledgeAmount,
        }
        setData((data) => [...data, obj])
      })
    } catch (err) {}
  }

  useEffect(() => {
    setFilteredChurches(data)
    if (search !== '') {
      const result = filteredChurches.filter((contribution) => {
        return contribution.userName.toLowerCase().match(search.toLowerCase())
      })

      setFilteredChurches(result)
    }
  }, [data, search])
  useEffect(() => {
    getData()
  }, [])
  const exportData = () => {
    var rows = []
    var headers = []
    for (var i = 0; i < column.length; i++) {
      headers[i] = column[i].name.props.children
    }
    rows.push(headers)
    console.log(filteredChurches)
    for (let i = 0; i < filteredChurches.length; i++) {
      let column1 = filteredChurches[i].userName
      let column2 = filteredChurches[i].contributionDate
      let column3 = filteredChurches[i].category
      let column4 = filteredChurches[i].comments
      let column5 = filteredChurches[i].PledgedAmount

      rows.push([column1, column2, column3, column4, column5])
    }
    let csvContent = 'data:text/csv;charset=utf-8,'
    rows.forEach(function (rowArray) {
      let row = rowArray.join(',')
      csvContent += row + '\r\n'
    })
    var encodedUri = encodeURI(csvContent)
    var link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'ContributionData.csv')
    document.body.appendChild(link)
    link.click()
  }
  return (
    <div className="text-center">
      <CCard className="mt-2">
        <CCardHeader className="bg-dark">
          <h3 className="text-white">Contribution Table</h3>
        </CCardHeader>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link to="">
              <button className="btn btn-primary" onClick={window.print}>
                Print
              </button>
            </Link>
            <Link to="">
              <button className="btn btn-primary" onClick={exportData}>
                Export
              </button>
            </Link>
            <Link to="/forms/contribution/">
              <button className="btn btn-primary">Add New Contribution</button>
            </Link>
            <div className="ms-auto mb-3">
              <input
                type="text"
                placeholder="Search Here"
                className="w-35 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <DataTable
            columns={column}
            data={filteredChurches}
            customStyles={customStyles}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ContributionTable
