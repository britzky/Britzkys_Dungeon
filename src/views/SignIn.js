import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import{ Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import StoneButton from '../components/StoneButton';
import { FormBox } from '../components/CustomBoxes';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleAuth } from '../components/GoogleAuth';


export default function SignIn() {
  const { authUser, loading } = useAuth()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && authUser) {
      navigate('/');
    }
  }, [authUser, loading, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
    })
    .then(() => {
      //after successful signin navigate to the home page
      navigate('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({
        errorCode: errorCode,
        errorMessage: errorMessage
      })
    });
  }

  return (
    <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormBox>
          <Avatar sx={{ m: 1, color: '#669bbc', bgcolor: '#fdf0d5' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="body1">
            Sign in
          </Typography>
          <Box onSubmit={handleSubmit} noValidate sx={{
             mt: 1,
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center', 
             }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {setEmail(event.target.value)}}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {setPassword(event.target.value)}}

            />
            <StoneButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </StoneButton>
            <GoogleAuth />
            <Grid container>
              <Grid item sx={{p:2}}>
                <Link to="/signup" style={{ textDecoration: 'none', color: '#669bbc'}}>
                  Or Register with Email and Password
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormBox>
      </Container>
    </>
  )
}
