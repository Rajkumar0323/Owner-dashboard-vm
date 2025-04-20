import React, { use, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions, cilPeople } from '@coreui/icons'
import axios from 'axios'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [visitors, setVisitors] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [])
  useEffect(() => {
    if (user) {
      axios
        .get(`https://chat-backend-jqfr.onrender.com/visitors/${user.id}`)
        .then((res) => setVisitors(res.data))
        .catch((err) => console.error('Error fetching visitors:', err))
    }
  }, [user])

  const navigate = useNavigate()
  const handleColClick = (des) => {
    navigate(des)
  }

  const preprocessData = (rawData) => {
    const countPerDate = {}

    rawData.forEach((item) => {
      const date = new Date(item['date']).toISOString().split('T')[0]

      countPerDate[date] = (countPerDate[date] || 0) + 1
    })

    // Sort the dates and prepare data for chart
    const sortedDates = Object.keys(countPerDate).sort()
    const counts = sortedDates.map((date) => countPerDate[date])

    return {
      labels: sortedDates,
      data: counts,
    }
  }
  const dynamicChartData = preprocessData(visitors || [])
  console.log('visitors data', dynamicChartData)
  // console.log('visitors data', visitors)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol
        sm={4}
        xs={4}
        md={4}
        xl={4}
        xxl={3}
        onClick={() => handleColClick('/owner')}
        style={{ cursor: 'pointer' }}
      >
        <CWidgetStatsA
          color="primary"
          value={
            <>
              {user ? user.id : '0'} <span className="fs-6 fw-normal"></span>
            </>
          }
          title="Owner Info"
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: dynamicChartData.labels,
                datasets: [
                  {
                    label: 'Visitors',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: dynamicChartData.data,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      {/* <CCol
        sm={6}
        xl={4}
        xxl={3}
        onClick={() => handleColClick('/visitors')}
        style={{ cursor: 'pointer' }}
      >
        <CWidgetStatsA
          color="info"
          value={
            <>
              {visitors ? visitors.length : 0}{' '}
              
            </>
          }
          title="Visitors"
          chart={
            <CChartLine
              ref={widgetChartRef2}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: dynamicChartData.labels,
                datasets: [
                  {
                    label: 'Visitors',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: dynamicChartData.data,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol> */}
      {/* <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              2.49%{' '}
              <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Conversion Rate"
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol> */}
      <CCol
        sm={4}
        xs={4}
        md={4}
        xl={4}
        xxl={3}
        onClick={() => handleColClick('/visitors')}
        style={{ cursor: 'pointer' }}
      >
        <CWidgetStatsA
          color="danger"
          value={<>{visitors ? visitors.length : 0} </>}
          title="Visitors"
          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: dynamicChartData.labels,
                datasets: [
                  {
                    label: 'Visitors',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: dynamicChartData.data,
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
