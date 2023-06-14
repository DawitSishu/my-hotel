import { Box, Button, Grid, Typography,FormHelperText } from '@mui/material';
import {useForm,Controller} from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import EventIcon from '@mui/icons-material/Event';
import {useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BaseUri = 'http://localhost:5000/api/rooms/available';
//api/rooms/available post 

const HomeBookRoom = () => {
    const [err,setErr] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, control,formState: { errors } } = useForm();


    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    
    const onDataSubmit = async(data) =>{
       try {
         setErr('')
         const response = await axios.post(BaseUri,{...data}) 
         if(response){
          navigate('/rooms', { state: {room : response.data, dates:{...data} }});

         }  
        } catch (error) {
         console.log(error);
      }
    }  


  return (
    <ThemeProvider theme={darkTheme}>
        <Box
        component='form'
        sx={{
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            padding: '20px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'transparent',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '400px',
            boxSizing: 'border-box',
            '@media (max-width: 400px)': {
              width: '100vw',
            },
          }}
          onSubmit={handleSubmit(onDataSubmit)}
    >
        <Grid 
            container
        >
            <Grid item xs={12}>
                <Typography 
                    variant='h2' 
                    sx={{fontFamily:'Georgia',textAlign: 'center', color:"white" }}>
                        Book A Room
                </Typography>
                <Typography color="red" variant="h7">
                  {err}
                </Typography>
            </Grid>

            <Grid item xs={12} mt={3}>
                 <Controller
                    name="checkInDate"
                    control={control}
                    rules={{ required: "Check-In Date can't be empty" }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Check-In Date"
                          value={field.value || null}
                          onChange={(date) => field.onChange(date)}
                          textField={(params) => (
                            <OutlinedInput
                              {...params}
                              fullWidth
                              id="checkInDate"
                              type="text"
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EventIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                          sx={{ width: '100%' }}
                          error={!!errors.checkInDate}
                        />
                        {errors.checkInDate && (
                          <FormHelperText error>{errors.checkInDate.message}</FormHelperText>
                        )}
                      </LocalizationProvider>
                    )}
                  />
            </Grid>
            <Grid item xs={12} mt={3} >
                <Controller
                    name='checkOutDate'
                    control={control}
                    rules={{ required: "Check-Out Date can't be empty" }}
                    render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Check-Out Date"
                            value={field.value || null} 
                            onChange={(date) => field.onChange(date)}
                            textField={(params) => (
                              <OutlinedInput
                                {...params}
                                fullWidth
                                id="checkOutDate"
                                type="text"
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EventIcon  />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                            sx={{ width: '100%' }}
                            error={!!errors.checkInDate}
                          />
                          {errors.checkOutDate && (
                          <FormHelperText error>{errors.checkOutDate.message}</FormHelperText>
                        )}
              </LocalizationProvider>
                  )}
                 />
            </Grid>
            <Grid item xs={10}>
                <Button type='submit' variant='outlined' sx={{mt:3}}>Find Rooms</Button>
            </Grid>   
        </Grid>
    </Box>
    </ThemeProvider>
        
  )
}

export default HomeBookRoom