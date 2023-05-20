import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import StoneButton from '../components/StoneButton';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { FormBox } from '../components/CustomBoxes';
import { useAuth } from '../context/AuthContext';
import { ResponsiveTypography } from '../components/ResponsiveTypography';
import { useSaveUser } from '../hooks/useSaveUser';

export default function SignUp() {
const [email, setEmail] = useState(null)
const [password, setPassword] = useState(null)
const [name, setName] = useState(null)

const { saveUser } = useSaveUser()

const { authUser, loading } = useAuth()
const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();
  
  const data = new FormData(event.currentTarget);
  console.log({
    email: data.get('email'),
    password: data.get('password')
  });

  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    await updateProfile(user, {displayName: name,}).then(async () => {
        //after successfully updating the profile navigate to the home page
        navigate('/');
    }) 
    
      // add data to user
      const userData = {
        uid: user.uid,
        email: user.email
      }

      //add user data to firestore
      await saveUser(userData)
    
    // Navigate to home page after successful sign up and when authUser is available
    if (!loading && authUser) {
      navigate('/');
    }
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // ..
    };
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormBox sx={{p:5}}>
          <Avatar sx={{ m: 1, color: '#669bbc', bgcolor: '#fdf0d5' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="body1">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => {setName(event.target.value)}}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {setEmail(event.target.value)}}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {setPassword(event.target.value)}}

                />
              </Grid>
            </Grid>
            <StoneButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </StoneButton>
            <Grid container justifyContent="center">          
              <Grid item>
                <Link to="/signin"  style={{ textDecoration: 'none', color: '#669bbc'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormBox>
      </Container>
    </>
  )
}
