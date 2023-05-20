import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import { useSaveUser } from '../hooks/useSaveUser'
import StoneButton from './StoneButton'

export const GoogleAuth = () => {
    const { saveUser } = useSaveUser()

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            saveUser(user)
            console.log(user)
        } catch (error) {
            console.error(error.message)
        }
    }
  return <>
  <StoneButton onClick={handleGoogleSignIn} fullWidth>Sign in with Google</StoneButton>
  </>
}
