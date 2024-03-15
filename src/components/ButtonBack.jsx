import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from "./Button";

export default function ButtonBack() {
    const navigate = useNavigate()
  return (
    <Button onClick={(e) =>{
        e.preventDefault();
        navigate(-1)
      }} types='back'>Back</Button>
  )
}
