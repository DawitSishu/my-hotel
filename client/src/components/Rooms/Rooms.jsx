import {useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import {Typography,Box,Grid, Button} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '../NavBar/NavBar';
import photo from '../../Assets/9.jpg';
import EventIcon from '@mui/icons-material/Event';
import dayjs from 'dayjs';

const Rooms = () => {
    const [rooms,setRooms] = useState(null);
    const [dates,setDates] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
    
    useEffect(()=>{
        if(!location.state) {
            navigate('/404');
        }else{
          const availableRoooms  = location.state.room;
          const dates = location.state.dates;
            console.log(availableRoooms ,dates);
            setRooms(availableRoooms);
            setDates(dates);
        }
    },[])

    const handleReservation = (room) =>{
      navigate('/reserve',{ state: {room} });
    }


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar />
      <Grid container spacing={2} width="100vw" sx={{marginTop:12}}>
         { dates && <Grid item xs={12} sx={{ marginLeft: 5,marginBottom:5 }}>
            <Typography variant='h4'>Available Rooms: {dayjs(dates.checkInDate.$d).format('MMMM DD, YYYY')} - {dayjs(dates.checkOutDate.$d).format('MMMM DD, YYYY')}</Typography>
          </Grid>} 
          { rooms ? rooms.map((room)=>{
                        return(
                          <Grid item xs={12} sx={{ marginLeft: 5 }} key={room._id}> 
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'center', sm: 'flex-start' },
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                            padding: '15px',
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '70%' },
                          }}
                        >
                          <img src={photo} style={{ maxWidth: 300, width: '50%' }} />
                          <Box sx={{ marginLeft: { xs: 0, sm: 6 }, marginTop: { xs: 4, sm: 0 } }}>
                            <Typography variant="h4">{room.type}</Typography>
                            <Typography variant="h6">{`Price: $${room.price}`}</Typography>
                            <Typography variant="h6">{`Available: ${room.available} Rooms`}</Typography>
                            <Button 
                              variant="contained" 
                              sx={{ marginTop: 2 }} 
                              startIcon={<EventIcon />}
                              onClick={()=>{handleReservation(room)}}
                              >
                                Reserve
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                      )
                   })
                      : null}
          
    </Grid>
    </ThemeProvider>
  )
}

export default Rooms