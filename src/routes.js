import React from 'react'

const Dashboard1 = React.lazy(() => import('./views/dashboard/Dashboard1'))

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

//Forms
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const ChurchEdit = React.lazy(() => import('./views/forms/church-edit/ChurchEdit'))
const PledgeAdd = React.lazy(() => import('./views/forms/pledge-add/PledgeAdd'))
const PledgedCategory = React.lazy(() => import('./views/forms/pledged-category/PledgedCategory'))
const ChurchProfile = React.lazy(() => import('./views/forms/church-profile/ChurchProfile'))
const ContributionTable = React.lazy(() =>
  import('./views/forms/contribution-table/ContributionTable'),
)
const PeopleTable = React.lazy(() => import('./views/forms/people-table/PeopleTable'))
const PeopleView = React.lazy(() => import('./views/forms/people-table/View'))
const OrganizationTable = React.lazy(() =>
  import('./views/forms/organization-table/OrganizationTable'),
)
const ContributionForm = React.lazy(() =>
  import('./views/forms/contribution-form/ContributionForm'),
)
const Contribution = React.lazy(() => import('./views/forms/contribution/Contribution'))
const OrganizationForm = React.lazy(() =>
  import('./views/forms/organization-form/OrganizationForm'),
)

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard1', name: 'Dashboard', element: Dashboard1 },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/pledged-category', name: 'Pledged Category', element: PledgedCategory },
  { path: '/forms/church-profile', name: 'ChurchProfile', element: ChurchProfile },
  { path: '/forms/church-edit', name: 'ChurchEdit', element: ChurchEdit },
  { path: '/forms/contribution-form', name: 'Contribution Form', element: ContributionForm },
  { path: '/forms/people-table', name: 'People Table', element: PeopleTable },
  { path: '/forms/people-table/view', name: 'PeopleView', element: PeopleView },
  { path: '/forms/pledge-add', name: 'PledgeAdd', element: PledgeAdd },
  { path: '/forms/organization-table', name: 'Organization Table', element: OrganizationTable },
  { path: '/forms/organization-form', name: 'Organization Form', element: OrganizationForm },

  { path: '/forms/contribution-table', name: 'ContributionTable', element: ContributionTable },
  { path: '/forms/contribution', name: 'Contribution', element: Contribution },

  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
