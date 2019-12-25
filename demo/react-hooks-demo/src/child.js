import React, { useContext } from 'react';
import { AppContext } from './redux'


export default function Children(){
  const { state } = useContext(AppContext)
  return (
        
    <div>Name：{state.username}</div>
  )
}