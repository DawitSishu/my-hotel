import {useState,useEffect,useRef} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import {Typography,Box,Grid} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '../NavBar/NavBar';
import photo from '../../Assets/9.jpg';


const Rooms = () => {
    const [rooms,setRooms] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });
    
    useEffect(()=>{
        const availableRoooms  = location.state;

        if(!availableRoooms) {
            navigate('/');
        }else{
            // setRooms(rooms)
            console.log(availableRoooms);
            setRooms(availableRoooms);
        }
    },[])




  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar />
      <Grid
      container 
      spacing={2}
      width='100vw'
      >
        <Grid 
          item 
          xs={12} 
          sx ={{
            marginLeft:5,
            marginTop: 12,
          }}
          >
              <Box>
                <img src={photo} style={{maxWidth:300}} />
              </Box>
            </Grid>
      </Grid>
      {/* <Grid 
        container 
        spacing={2}
        sx={{
          marginLeft:5,
          marginTop: 10,
          overflowX: 'hidden',
        }}
        >
            <Grid item xs={12}>
              <Box>
                <img src={photo} style={{maxWidth:300}} />
              </Box>
            </Grid>
      </Grid> */}
    </ThemeProvider>
  )
}

export default Rooms