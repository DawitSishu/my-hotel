import { Box,Typography,Grid } from "@mui/material";
import MouseIcon from '@mui/icons-material/Mouse';
const HomeBody = () => {
  return (
    <Box
          sx={{
            display: 'flex',
      alignItems: 'center',
      position:'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height:'100%',
          }}
        >
        <Grid container spacing={2}>
          <Grid item xs={12}>
        <Typography variant="h1" sx={{ fontFamily: 'myCursive',  color: 'white' }}>My Hotel</Typography>
          </Grid>
          <Grid item xs={12}>
             <MouseIcon sx={{
                color:'white', 
                '@media (max-width: 800px)': {
                     display: 'none',
                    },
                }}  
                className="scroll-icon"
              />
          </Grid>
        </Grid>
        </Box>
  )
}

export default HomeBody;