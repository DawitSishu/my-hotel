import { Grid,Typography, Button, Box,TextField } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form";
import background from "../../Assets/bgvid.mp4";
import './Login.css';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { AccountCircle } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
// import Spinner from "../Spinner/Spinner"
import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/users/login'

function Login(props) {
    const [isDisabled,setIsDisabled] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [err,setErr] = useState('')

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUserData =  async (data) => {
        setIsDisabled(true)
        console.log(data);
        try {
         setErr('')
         const response = await axios.post(baseUrl,{...data}) 
         if(response){
           localStorage.clear();
           localStorage.setItem('token', response.data.token);
           props.onLogIn()
         }  
        } catch (error) {
         setIsDisabled(false)
         console.log(error);
         setErr(error.response.data.message)
      }
    }
  return (
    
  <div className="main">
    <video src={background} autoPlay muted loop />
    <ThemeProvider theme={darkTheme}>
  <Box
  component='form'
  onSubmit={handleSubmit(handleUserData)}
  sx={{
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    padding: '20px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    boxSizing: 'border-box',
    '@media (max-width: 400px)': {
      width: '100vw',
    },
  }}

    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Typography color="red" variant="h7">
        {err}
      </Typography>
        <OutlinedInput
            fullWidth={true}
            placeholder="Email"
            id="email"
            {...register('email', { required: "Email can't be empty" })}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle
                  
                />
              </InputAdornment>
            }
          />
          {errors.email && (
            <Typography color="error" variant="h7">
              {errors.email.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
        <OutlinedInput
        fullWidth={true}
            id="password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            {...register('password', { required: "Password can't be empty" })}
          />
          {errors.password && (
            <Typography color="error" variant="h7">
              {errors.password.message}
            </Typography>
          )}
        </Grid>
        <Grid item container xs={12} justifyContent="center" spacing={2}>
          <Grid item xs={10} sm={6} >
            <Button variant="contained" fullWidth type="submit">
              Log In
            </Button>
          </Grid>
          
          <Grid item xs={10} sm={6} >
            <Link to='/signup'>
            <Button variant="contained" fullWidth>
              Create Account
            </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
  </div>
  )
}

export default Login