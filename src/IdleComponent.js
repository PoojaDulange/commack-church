/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import { useIdleTimer } from 'react-idle-timer'
import { useRef, useState, useContext } from 'react'
import { CModal, CModalHeader, CModalFooter, CModalBody, CModalTitle } from '@coreui/react'
import { CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'

export default function IdleComponent() {
  const idleTimeRef = useRef(null)
  const [isIdle, setIsIdle] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()
  const { dispatch } = useContext(UserContext)

  const onIdle = () => {
    console.log('Idle')
    setVisible(true)
    setIsIdle(true)
    setShowModal(true)
    console.log(isIdle)
    dispatch({ type: 'Logout', payload: null })
    alert('Your session has expired, please login again!')
    navigate('/')
  }

  const handleOnActive = () => {
    console.log('Active')
  }
  const idleTimer = useIdleTimer({
    crossTab: true,
    ref: idleTimeRef,
    timeout: 60 * 5 * 1000,
    onIdle: onIdle,
    onActive: handleOnActive,
  })
  const handleClose = () => {
    setShowModal(false)
    setVisible(false)
  }
  const handleLogout = () => {
    setShowModal(false)
    navigate('/')
  }

  return (
    <>
      <div idleTimer={idleTimer}>
        {/* {isIdle && (
          <CModal className="show " visible={visible}>
            <CModalHeader>
              <CModalTitle>Session Timeout</CModalTitle>
            </CModalHeader>
            <CModalBody>Do you want to logout.</CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={handleLogout}>
                Logout
              </CButton>
              <CButton color="primary" onClick={handleClose}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
        )} */}
      </div>
    </>
  )
}
