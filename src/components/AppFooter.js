import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
      <span className="me-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          ITGeeks
        </a>
        <span className="ms-1">&copy; 2025 </span>
      </div>
      <div className="ms-auto">
       
        {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI React Admin &amp; Dashboard Template
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
