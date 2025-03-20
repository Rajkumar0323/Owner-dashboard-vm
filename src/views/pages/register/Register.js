import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBuilding, cilPhone } from '@coreui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSignup = async () => {
    const { name, email, mobile, address, password } = formData;
    if(!name || !email || !mobile || !address || !password){
      alert('All the fields are required!!!')
      return
    }
    try {
      const res = await axios.post('https://chat-backend-jqfr.onrender.com/signup', formData)      
      if (res.status===201) {
        alert('Signup successful! Please log in.')
        navigate('/login')
      }
    } catch (err) {
      alert('Signup failed!')
      console.log('Error', err.message)
    } finally {
      setFormData({
        name: '',
        mobile: '',
        address: '',
        email: '',
        password: '',
      })
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Enter Name"
                      autoComplete="name"
                      name="name"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Enter Email"
                      autoComplete="email"
                      name="email"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Enter Mobile no."
                      autoComplete="mobile"
                      name="mobile"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBuilding} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Enter Address"
                      autoComplete="address"
                      name="address"
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Enter Password"
                      autoComplete="new-password"
                      name="password"
                      onChange={handleChange}
                    />
                  </CInputGroup>
              
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSignup}>
                      Create Account
                    </CButton>
                  </div>
                  <div className="d-grid mt-2">
                    {' '}
                    <p>
                      If already have account? <Link to="/login">Click Here</Link>
                    </p>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
