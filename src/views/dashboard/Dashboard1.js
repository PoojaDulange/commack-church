import React from 'react'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <div className="mt-5">
        <WidgetsBrand withCharts />
      </div>
    </>
  )
}

export default Dashboard
