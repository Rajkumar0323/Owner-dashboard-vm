import React, { useEffect, useState, useRef } from 'react'
import { CRow, CCard, CCardHeader, CCardBody } from '@coreui/react' 
import QRCode from "react-qr-code";
import { useNavigate } from 'react-router-dom'



const QRCodes = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const qrRef = useRef(null); 
  const navigate = useNavigate()

  const handlePrint = () => {
    const printContent = qrRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent; 
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Owner QR Code
     
        </CCardHeader>
        <CCardBody ref={qrRef}>
          <CRow>
          <div className="d-flex w-100 justify-content-end"> <button className="btn btn-secondary m-2" onClick={()=>handlePrint()}>Print</button></div> 

          <div className='d-flex flex-column align-items-center gap-2'>
          <h4>{user?.name}</h4>
        <QRCode
          size={100}
          style={{ height: "auto", maxWidth: "40%", width: "40%" }}
          value={`https://visitor-management-visitor-form.netlify.app/?ownerId=${user?.id}`}
          viewBox={`0 0 256 256`}
        />
        </div>
           
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default QRCodes
