import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const saveUserToFirestore = async (user) => {
    try{
          //add user data to firestore
          await setDoc(doc(db, "users", user.uid), user)
          return { userData: user, error: null}
    }catch (error) {
        return { userData: null, error: error.message}
    }
}


export const useSaveUser = () => {
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState(null)

    const saveUser = async (user) => {
        const result = await saveUserToFirestore(user)
        setUserData(result.userData)
        setError(result.error)
    }


  return { userData , error, saveUser }
}