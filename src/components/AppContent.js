import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import IdleComponent from 'src/IdleComponent'

const AppContent = () => {
  return (
    <>
      <CContainer lg>
        <IdleComponent />
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              )
            })}
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="/" element={<Navigate to="dashboard1" replace />} />
          </Routes>
        </Suspense>
      </CContainer>
    </>
  )
}

export default React.memo(AppContent)
