import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import type { BackgroundConfig } from './backgroundConfig';

const PICSUM_BASE = 'https://picsum.photos/';

interface AppBackgroundProps {
  config: BackgroundConfig;
  refreshKey: number;
}

export function AppBackground({ config, refreshKey }: AppBackgroundProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (config.type !== 'image') return;

    setImageLoaded(false);
    const url = `${PICSUM_BASE}${window.innerWidth}/${window.innerHeight}?t=${refreshKey}`;
    const img = new Image();
    img.onload = () => {
      setImageUrl(url);
      setImageLoaded(true);
    };
    img.src = url;
  }, [config.type, refreshKey]);

  if (config.type === 'image') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 2s ease',
          zIndex: 0
        }}
      />
    );
  }

  if (config.type === 'color') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: config.color,
          zIndex: 0
        }}
      />
    );
  }

  // spheres
  if (config.type === 'gradient' && config.variant === 'spheres') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: '#030308',
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '70vw',
            height: '70vw',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(74,0,224,0.75) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'sphereBlob1 48s ease-in-out infinite',
            '@keyframes sphereBlob1': {
              '0%, 100%': { transform: 'translate(5vw, 5vh)' },
              '33%': { transform: 'translate(45vw, 20vh)' },
              '66%': { transform: 'translate(15vw, 55vh)' }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '55vw',
            height: '55vw',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(190,50,220,0.65) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'sphereBlob2 58s ease-in-out infinite',
            '@keyframes sphereBlob2': {
              '0%, 100%': { transform: 'translate(55vw, 45vh)' },
              '40%': { transform: 'translate(20vw, 65vh)' },
              '70%': { transform: 'translate(65vw, 10vh)' }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '40vw',
            height: '40vw',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,180,255,0.55) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'sphereBlob3 40s ease-in-out infinite',
            '@keyframes sphereBlob3': {
              '0%, 100%': { transform: 'translate(40vw, 5vh)' },
              '50%': { transform: 'translate(55vw, 65vh)' }
            }
          }}
        />
      </Box>
    );
  }

  // aurora
  if (config.type === 'gradient' && config.variant === 'aurora') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: '#010a14',
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '120%',
            height: '50%',
            top: '15%',
            left: '-10%',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(0,240,140,0.18) 35%, rgba(0,210,120,0.28) 55%, rgba(0,160,100,0.12) 75%, transparent 100%)',
            filter: 'blur(25px)',
            animation: 'auroraWave1 18s ease-in-out infinite',
            '@keyframes auroraWave1': {
              '0%, 100%': {
                transform: 'translateY(0) scaleX(1)',
                opacity: 0.85
              },
              '50%': { transform: 'translateY(-8vh) scaleX(1.08)', opacity: 1 }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '110%',
            height: '45%',
            top: '22%',
            left: '-5%',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(40,160,255,0.12) 40%, rgba(80,80,220,0.2) 60%, transparent 100%)',
            filter: 'blur(35px)',
            animation: 'auroraWave2 24s ease-in-out infinite',
            '@keyframes auroraWave2': {
              '0%, 100%': {
                transform: 'translateY(3vh) scaleX(0.97)',
                opacity: 0.7
              },
              '60%': {
                transform: 'translateY(-5vh) scaleX(1.04)',
                opacity: 0.9
              }
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '80%',
            height: '30%',
            top: '10%',
            left: '10%',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(180,255,200,0.06) 50%, transparent 100%)',
            filter: 'blur(20px)',
            animation: 'auroraShimmer 12s ease-in-out infinite',
            '@keyframes auroraShimmer': {
              '0%, 100%': { opacity: 0.5, transform: 'translateX(0)' },
              '50%': { opacity: 1, transform: 'translateX(5vw)' }
            }
          }}
        />
      </Box>
    );
  }

  // gradient warp
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(135deg, #0f0c29, #302b63, #24243e, #0f2027, #203a43, #2c5364)',
        backgroundSize: '400% 400%',
        animation: 'gradientWarp 50s ease infinite',
        '@keyframes gradientWarp': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        zIndex: 0
      }}
    />
  );
}
