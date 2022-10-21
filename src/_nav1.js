import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Admin Dashboard',
    to: '/dashboard1',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Admin',
    icon: <i className="fa-solid fa-user-tie m-auto"></i>,
    items: [
      {
        component: CNavItem,
        name: 'Church Profile',
        to: 'forms/church-profile',
        icon: <i className="fa-solid fa-id-card mx-3"></i>,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Master Data',
    icon: <i className="fa-solid fa-caret-down m-auto"></i>,
    items: [
      {
        component: CNavItem,
        name: 'Organization',
        to: 'forms/organization-table',
        icon: <i className="fa-solid fa-building-columns mx-3"></i>,
      },
      {
        component: CNavItem,
        name: 'Individual',
        to: 'forms/people-table',
        icon: <i className="fa-solid fa-user mx-3"></i>,
      },
      {
        component: CNavItem,
        name: 'Contribution',
        to: 'forms/contribution-table',
        icon: <i className="fa-solid fa-money-check-dollar mx-3"></i>,
      },
      {
        component: CNavItem,
        name: 'Pledge Categories',
        to: 'forms/pledged-category',
        icon: <i className="fa-solid fa-table-list mx-3"></i>,
      },
    ],
  },
  {
    component: CNavItem,
    name: 'LogOut',
    to: '/',
    icon: <i className="fa-solid fa-arrow-right-from-bracket mx-3"></i>,
  },
]

export default _nav
