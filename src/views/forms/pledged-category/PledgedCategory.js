import React, { useEffect, useState, useContext } from 'react'
import DataTable from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import ExcelJS from 'exceljs'
import axios from '../../../axios.js'
import { UserContext } from '../../../context/UserContext.js'

const PledgedCategory = () => {
  const token = useContext(UserContext)

  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filteredChurches, setFilteredChurches] = useState([])
  const [data, setData] = useState([])
  const getData = async () => {
    let d = await axios.get('/api/pledgecategory', {
      headers: { Authorization: `Bearer ${token.user}` },
    })
    const data1 = d.data.data[0]
    setData([...data, ...data1])
  }
  useEffect(() => {
    getData()
  }, [])
  const handleEdit = (row, e) => {
    localStorage.setItem('pledgeID', row.pledgeID)
    navigate('/forms/pledge-add/')
  }
  const addData = (e) => {
    e.preventDefault()
    localStorage.setItem('pledgeID', null)
    navigate('/forms/pledge-add/')
  }

  const column = [
    {
      name: <strong>Pledge Name</strong>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <strong>Description</strong>,
      selector: (row) => row.description,
      grow: 3,
    },
    {
      name: <strong>Action</strong>,
      cell: (row) => (
        <button className="btn btn-primary" onClick={() => handleEdit(row)}>
          Edit
        </button>
      ),
    },
  ]
  const customStyles = {
    headCells: {
      style: { background: 'black', color: 'white' },
    },
  }
  useEffect(() => {
    setFilteredChurches(data)

    const result = data.filter((church) => {
      return church.name.toLowerCase().match(search.toLowerCase())
    })

    setFilteredChurches(result)
  }, [search, data])

  const exportData = () => {
    var rows = []
    var headers = []
    for (var i = 0; i < column.length - 1; i++) {
      headers[i] = column[i].name.props.children
    }
    rows.push(headers)
    console.log(filteredChurches)
    for (let i = 0; i < filteredChurches.length; i++) {
      let column1 = filteredChurches[i].name
      let column2 = filteredChurches[i].description

      rows.push([column1, column2])
    }
    let csvContent = 'data:text/csv;charset=utf-8,'
    rows.forEach(function (rowArray) {
      let row = rowArray.join(',')
      csvContent += row + '\r\n'
    })
    var encodedUri = encodeURI(csvContent)
    var link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'PleadgeCategoryData.csv')
    document.body.appendChild(link)
    link.click()
  }

  return (
    <div className="text-center">
      <CCard className="mt-2">
        <CCardHeader className="bg-dark">
          <h3 className="text-white">Pledged Category</h3>
        </CCardHeader>
        <CCardBody>
          <div className="d-md-flex">
            <div className="d-grid gap-2 d-md-flex ">
              <Link to="">
                <CButton onClick={addData}>Add New Pledge</CButton>
              </Link>
              <Link to="">
                <CButton onClick={exportData}>Export</CButton>
              </Link>
            </div>
            <div className=" ms-auto mb-3">
              <input
                type="text"
                placeholder="Search Here"
                className="w-100 form-control ms-500"
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
            fixedHeaderScrollHeight="1000px"
            selectableRows
            selectableRowsHighlight
            highlightOnHover
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default PledgedCategory
