import React, { useEffect, useState, useMemo } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilUser, cilPeople, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import useSound from 'use-sound'
import mySound from './../../assets/beep-04.mp3'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { io } from 'socket.io-client'
const AppHeaderDropdown = () => {
  const socket = useMemo(() => io('https://chat-backend-jqfr.onrender.com'), [])
  const [socketID, setSocketID] = useState('')
  const [notifications, setNotifications] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [playSound] = useSound(mySound)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const navigate = useNavigate()
  const handleColClick = (des) => {
    navigate(des)
  }
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => playSound(), 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])
  const handleLogOut = () => {
    localStorage.clear()

    navigate('/login')
  }
  useEffect(() => {
    if (user) {
      socket.emit('registerOwner', user.id)
      socket.on('newVisitor', ({ data, socketId }) => {
        setNotifications(data)
        setIsPlaying(true)
        setSocketID(socketId)
        // console.log('visitorData', data)
      })
    }
  }, [user])
  const handleResponse = (visitorId, socketId, status) => {
    socket.emit('ownerResponse', {
      visitorId,
      status,
      socketId,
    })
    setNotifications(null)
    setIsPlaying(false)
  }
  return (
    <>
      <CDropdown variant="nav-item">
      <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} centered>
                <Modal.Body className="text-center">
                  <img src={selectedImage} alt="Large Preview" className="img-fluid rounded" />
                </Modal.Body>
              </Modal>
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={avatar8} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
          <CDropdownItem onClick={() => handleColClick('/visitors')} style={{ cursor: 'pointer' }}>
            <CIcon icon={cilPeople} className="me-2" />
            Visitors
            <CBadge color="info" className="ms-2">
              42
            </CBadge>
          </CDropdownItem>

          <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
          <CDropdownItem onClick={() => handleColClick('/owner')} style={{ cursor: 'pointer' }}>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={handleLogOut} style={{ cursor: 'pointer' }}>
            <CIcon icon={cilAccountLogout} className="me-2" />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      {notifications && (
        <div className="notification-popup">

          <div className="notification-box border border-1 rounded-3 bg-light p-3 shadow">
            <p className="mb-2 fw-bold">🚪 Someone is at the door!</p>
            <img src={notifications?.capturedImage} style={{ width: '100px', height: '100px',cursor:"pointer"  }} onClick={() => setSelectedImage(notifications?.capturedImage)}/>
            <p
              style={{
                maxWidth: '250px',
                wordWrap: 'break-word',
                whitespace: 'pre-wrap',
                textAlign: 'center',
              }}
            >
              <strong>Reason:</strong> {notifications?.reason || 'Not specified'}
            </p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => handleResponse(notifications?.id, socketID, 'accepted')}
              >
                ✅ Accept
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleResponse(notifications?.id, socketID, 'rejected')}
              >
                ❌ Reject
              </button>
            </div>
          </div>
        </div>
      )}
      <style>
        {`
          .notification-popup {
            position: fixed;
            top: 80px; /* Adjust according to navbar height */
            right: 20px;
            z-index: 1050;
          }
          .notification-box {
            width: 280px;
            background: white;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            animation: fadeIn 0.3s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  )
}

export default AppHeaderDropdown
