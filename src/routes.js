import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const QRCodes = React.lazy(() => import('./views/qrcode/QRCodes'))
const Visitors = React.lazy(() => import('./views/visitors/VisitorsList'))
const Owner = React.lazy(() => import('./views/owner/Owner'))



const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [  
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: '', element: QRCodes, exact: true },  
  { path: '/qrcode', name: 'QR Code', element: QRCodes },
  { path: '/visitors', name: 'Visitors', element: Visitors },
  { path: '/owner', name: 'Owner Details', element: Owner },
 
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
