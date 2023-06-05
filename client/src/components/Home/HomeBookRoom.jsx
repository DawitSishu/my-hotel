import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const HomeBookRoom = () => {
  return (
        <Grid 
            container
            justifyContent="center" 
            alignItems="center"
            height="100vh"
        >
            <Grid item xs={12}>
                <Typography 
                    variant='h2' 
                    sx={{color:'white',fontFamily:'Georgia',textAlign: 'center' }}>
                        Book A Room
                </Typography>
            </Grid>
        </Grid>
  )
}

export default HomeBookRoom