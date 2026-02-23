import type { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'


export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
