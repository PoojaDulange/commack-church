import PropTypes from 'prop-types'
import React from 'react'
import { CTabContent, CTabPane } from '@coreui/react'

const DocsExample = (props) => {
  const { children, href } = props

  return (
    <div className="example">
      <CTabContent className="rounded-bottom">
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

DocsExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(DocsExample)
