import FullProjectView from '@/components/organisms/FullProjectView'
import Header from '@/components/organisms/header'
import { Button } from '@/components/ui/button'
import React from 'react'

const layout = ({
    children,
  }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
     {children}
     <FullProjectView/>
    </main>
  )
}

export default layout
