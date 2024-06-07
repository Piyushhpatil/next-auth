import React, { useState } from 'react'

export default function SignupPage() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setloading ] = useState(false)
    
    const onSignup = async () => {
        try {
            
        } catch (error) {
            console.log("Signup Failed")
        }
    }
  return (
    <div>login page</div>
  )
}