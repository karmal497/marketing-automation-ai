import React, { useEffect, useState } from 'react';
import { Box, Typography, keyframes, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const waterRipple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
    text-shadow: 0 0 30px rgba(25, 118, 210, 0.8),
                 0 0 60px rgba(25, 118, 210, 0.6),
                 0 0 90px rgba(25, 118, 210, 0.4);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
`;

const floating = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const particleMove = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) rotate(var(--r));
    opacity: 0;
  }
`;

const BackgroundParticles = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  zIndex: -1,
  background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
});

const Particle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(25,118,210,0.2) 70%)',
  animation: `${particleMove} 15s linear infinite`,
  '&:nth-of-type(1)': {
    '--tx': '-100px',
    '--ty': '-150px',
    '--r': '45deg',
    width: '15px',
    height: '15px',
    top: '15%',
    left: '25%',
    animationDelay: '0s',
  },
  '&:nth-of-type(2)': {
    '--tx': '200px',
    '--ty': '-200px',
    '--r': '135deg',
    width: '20px',
    height: '20px',
    top: '20%',
    left: '70%',
    animationDelay: '1.5s',
  },
  '&:nth-of-type(3)': {
    '--tx': '-200px',
    '--ty': '180px',
    '--r': '225deg',
    width: '25px',
    height: '25px',
    top: '60%',
    left: '10%',
    animationDelay: '3s',
  },
  '&:nth-of-type(4)': {
    '--tx': '180px',
    '--ty': '150px',
    '--r': '315deg',
    width: '18px',
    height: '18px',
    top: '70%',
    left: '80%',
    animationDelay: '4.5s',
  },
  '&:nth-of-type(5)': {
    '--tx': '-150px',
    '--ty': '-180px',
    '--r': '90deg',
    width: '22px',
    height: '22px',
    top: '30%',
    left: '15%',
    animationDelay: '6s',
  },
  '&:nth-of-type(6)': {
    '--tx': '120px',
    '--ty': '200px',
    '--r': '180deg',
    width: '17px',
    height: '17px',
    top: '50%',
    left: '65%',
    animationDelay: '7.5s',
  },
}));

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    // Efecto de escritura progresiva
    const text = 'KarmaStudios';
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    // Redirigir al dashboard después de 5 segundos
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <BackgroundParticles>
        <Particle />
        <Particle />
        <Particle />
        <Particle />
        <Particle />
        <Particle />
      </BackgroundParticles>
      
      <Typography
        variant="h1"
        sx={{
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: `${waterRipple} 2s ease-in-out, ${floating} 6s ease-in-out infinite`,
          textAlign: 'center',
          fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
          px: 2,
          textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
        }}
      >
        {displayText}
        <Box 
          component="span" 
          sx={{ 
            animation: 'blink 0.7s infinite',
            '@keyframes blink': {
              '0%': { opacity: 1 },
              '50%': { opacity: 0 },
              '100%': { opacity: 1 },
            }
          }}
        >
          |
        </Box>
      </Typography>
    </Box>
  );
};

export default SplashScreen;