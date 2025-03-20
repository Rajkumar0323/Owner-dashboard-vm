import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
  cilQrCode,
  cilPeople
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
   
  },
  {
    component: CNavTitle,
    name: 'Visitors',
  },
  {
    component: CNavItem,
    name: 'Visitors List',
    to: '/visitors',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'QR Code',
  },
  {
    component: CNavItem,
    name: 'QR Codes',
    to: '/qrcode',
    icon: <CIcon icon={cilQrCode} customClassName="nav-icon" />,
  },

]

export default _nav
