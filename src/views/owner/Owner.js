import React, { useEffect, useState, createRef } from 'react'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'

const Owner = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Owner Details
          {/* <DocsLink href="https://coreui.io/docs/utilities/colors/" /> */}
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <strong>Name:</strong> {user?.name}
            </CCol>

            <CCol>
              <strong>Mobile:</strong> {user?.mobile}
            </CCol>
          </CRow>
       
          <CRow>
            <CCol>
              <strong>Email:</strong> {user?.email}
            </CCol>
            <CCol>
              <strong>Address:</strong> {user?.address}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Owner
