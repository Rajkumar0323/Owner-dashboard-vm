import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Modal } from 'react-bootstrap'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cifIn, cilPeople } from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const navigate = useNavigate()
  const [visitors, setVisitors] = useState([])
  function formatToIST(utcDate) {
    const date = new Date(utcDate)
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }
    return new Intl.DateTimeFormat('en-IN', options).format(date)
  }
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (user) {
      axios
        .get(`https://chat-backend-jqfr.onrender.com/api/visitors/${user.id}`)
        .then((res) => setVisitors(res.data))
        .catch((err) => console.error('Error fetching visitors:', err))
    }
  }, [user])
  return (
    <>
      <WidgetsDropdown visitors={visitors} className="mb-4" />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Visitors</CCardHeader>
            <CCardBody>
              <CRow></CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} centered>
                  <Modal.Body className="text-center">
                    <img src={selectedImage} alt="Large Preview" className="img-fluid rounded" />
                  </Modal.Body>
                </Modal>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell> */}
                    <CTableHeaderCell className="bg-body-tertiary">Reason</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Country
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell className="bg-body-tertiary text-center">
                      Payment Method
                    </CTableHeaderCell> */}
                    <CTableHeaderCell className="bg-body-tertiary">Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {visitors &&
                    visitors.length > 0 &&
                    visitors.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                          {/* <CAvatar size="lg" src={item?.image}  style={{height:"3rem"}}/> */}
                          <img
                            src={item?.image}
                            style={{ height: '10%', width: '3rem', cursor: 'pointer' }}
                            onClick={() => setSelectedImage(item?.image)}
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div
                            style={{
                              maxWidth: '250px',
                              wordWrap: 'break-word',
                              whitespace: 'pre-wrap',
                            }}
                          >
                            {item?.reason}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CIcon size="xl" icon={cifIn} />
                        </CTableDataCell>

                        <CTableDataCell>
                          <div className="small text-body-secondary text-nowrap">Last visit</div>
                          <div className="fw-semibold text-nowrap">{formatToIST(item?.date)}</div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
