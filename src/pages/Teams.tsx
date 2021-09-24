import { RouteComponentProps } from '@reach/router'
import { RenderPagesWithTabs } from 'components/layout'
import React from 'react'

export const Teams: React.FC<RouteComponentProps> = () => {
  return (
    <RenderPagesWithTabs>
      <h1>Teams</h1>
    </RenderPagesWithTabs>
  )
}
