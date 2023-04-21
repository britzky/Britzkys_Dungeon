import React from 'react'
import { Paper, Box, Typography } from '@mui/material';


export default function ImagePaper({src, alt, onClick, title}) {
  return (
    <Paper 
    elevation={24} 
    onClick={onClick}
    sx={{
        width: 300,
        height: 300,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        cursor: 'pointer',
        boxShadow: '1em 1em 1em rgba(0, 0, 0, .7)',
        border: '2px solid black',
        margin: '2em 0'
    }}
    >
        <img
        src={src}
        alt={alt}
        style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        }}
        />
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '4px 8px',
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <Typography variant="body2" align="center">
          {title}
        </Typography>
      </Box>
    </Paper>
  )
}