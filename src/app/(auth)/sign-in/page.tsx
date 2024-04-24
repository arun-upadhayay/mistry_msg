'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

const page = () => {
  return (
  <>
    <div> not sign in </div>
    <button onClick ={()=> signIn()}>sign in </button>
  </>
  )
}

export default page