import { Grid,Typography, Button, Box,TextField,InputLabel } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form";
import '../Login/Login.css';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { AccountCircle, Email,AccessTime } from '@mui/icons-material';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import Spinner from "../Spinner/Spinner"

const baseUrl = 'http://localhost:5000/api/users/signup'

const SignUpForm = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleDataSubmit = (data) => {
      const newAge = calculateAge(data.age);
      if(newAge < 18){  
          alert("Must be at least 18 years old");
          return
      }else{
        props.onSubmit({...data,age: `${newAge}`});
      }
    };
    
    const calculateAge = (birthDate) => {
      const today = new Date();
    const birthDateObj = new Date(birthDate);
    let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    if (
      today.getMonth() < birthDateObj.getMonth() ||
      (today.getMonth() === birthDateObj.getMonth() &&
        today.getDate() < birthDateObj.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

   
  return (
    <Box
    component='form'
    onSubmit={handleSubmit(handleDataSubmit)}
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
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
           <OutlinedInput
          fullWidth={true}
              id="Name"
              placeholder="Name"
              type='text'
              startAdornment={
                <InputAdornment position="start">
                      <AccountCircle />
                </InputAdornment>
              }
              {...register('name', { required: "Name can't be empty" })}
            />
            {errors.password && (
              <Typography color="error" variant="h7">
                {errors.name.message}
              </Typography>
            )} 
          </Grid>
          <Grid item xs={12}>
          <InputLabel  htmlFor="date-input">
          Select Birth-Date
        </InputLabel>
          <OutlinedInput
              fullWidth={true}
              type="date"
                startAdornment={
                    <InputAdornment position="start">
                            <EventIcon />
                    </InputAdornment>
                  }
                id="date-input"
              {...register('age', { required: "Birth-Date can't be empty" })}
            />
            {errors.password && (
              <Typography color="error" variant="h7">
                {errors.age.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
          <Typography color="red" variant="h7">
          {props.err}
        </Typography>
          <OutlinedInput
              fullWidth={true}
              placeholder="Email"
              id="email"
              {...register('email', { required: "Email can't be empty" })}
              startAdornment={
                <InputAdornment position="start">
                  <Email />
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
          <Grid item xs={12}>
          </Grid>
          <Grid item container xs={12} justifyContent="center" spacing={2}>
            <Grid item xs={10} sm={6} >
              <Button variant="contained" fullWidth type="submit">
                Sign Up
              </Button>
            </Grid>
            
            <Grid item xs={10} sm={6} >
              <Link to='/'>
              <Button variant="contained" fullWidth>
              Log In
              </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  )
}

export default SignUpForm