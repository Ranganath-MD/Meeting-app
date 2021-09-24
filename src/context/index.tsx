import React from 'react'
import { AuthProvider } from './AuthProvider'
import { MeetingProvider } from './MeetingContext'

export const Provider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <MeetingProvider>
      {children}
      </MeetingProvider>
    </AuthProvider>
  )
}


export * from "./AuthProvider"
export * from "./MeetingContext"