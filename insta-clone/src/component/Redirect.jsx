import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function 
() {
const id = useParams()
const navigate = useNavigate()
    useEffect(()=>{
navigate("/profiles/" + id.id)
    },[id])
  return (
    <div>

    </div>
  )
}
