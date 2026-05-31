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
        {/* green-teal blob */}
        <Box
          sx={{
            position: 'absolute',
            width: '120vw',
            height: '55vh',
            top: '10%',
            left: '-10vw',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(0,220,120,0.22) 0%, transparent 70%)',
            filter: 'blur(70px)',
            animation: 'auroraBlob1 20s ease-in-out infinite',
            '@keyframes auroraBlob1': {
              '0%, 100%': { transform: 'translate(0, 0) scaleX(1)' },
              '50%': { transform: 'translate(15vw, -8vh) scaleX(1.1)' }
            }
          }}
        />
        {/* blue-violet blob */}
        <Box
          sx={{
            position: 'absolute',
            width: '110vw',
            height: '55vh',
            top: '15%',
            left: '-5vw',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(60,100,255,0.18) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'auroraBlob2 26s ease-in-out infinite',
            '@keyframes auroraBlob2': {
              '0%, 100%': { transform: 'translate(0, 0) scaleX(0.95)' },
              '60%': { transform: 'translate(-5vw, 5vh) scaleX(1.08)' }
            }
          }}
        />
        {/* soft white-green shimmer */}
        <Box
          sx={{
            position: 'absolute',
            width: '100vw',
            height: '40vh',
            top: '12%',
            left: '0vw',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(160,255,200,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'auroraBlob3 14s ease-in-out infinite',
            '@keyframes auroraBlob3': {
              '0%, 100%': { transform: 'translate(0, 0)' },
              '50%': { transform: 'translate(20vw, -4vh)' }
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
