import { useCallback, useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const PARTICLE_COLORS_DARK = ['#D4AF37', '#C5A880', '#F3E5AB', '#B59410'];
const PARTICLE_COLORS_LIGHT = ['#B59410', '#C5A880', '#AA7C11', '#D4AF37'];

const ParticleBackground = ({ theme }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const isDark = theme === 'dark';

  const options = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ['grab', 'repulse'],
          },
          onClick: {
            enable: true,
            mode: 'push',
          },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: isDark ? 0.35 : 0.5,
            },
          },
          repulse: {
            distance: 100,
            duration: 0.4,
            speed: 0.5,
          },
          push: {
            quantity: 3,
          },
        },
      },
      particles: {
        color: {
          value: isDark ? PARTICLE_COLORS_DARK : PARTICLE_COLORS_LIGHT,
        },
        links: {
          color: isDark ? '#D4AF37' : '#B59410',
          distance: 160,
          enable: true,
          opacity: isDark ? 0.15 : 0.35,
          width: 1,
          triangles: {
            enable: true,
            opacity: isDark ? 0.02 : 0.06,
          },
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'out',
          },
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 80,
        },
        opacity: {
          value: isDark ? { min: 0.2, max: 0.6 } : { min: 0.35, max: 0.75 },
          animation: {
            enable: true,
            speed: 0.8,
            sync: false,
            minimumValue: isDark ? 0.15 : 0.3,
          },
        },
        shape: {
          type: ['circle', 'triangle'],
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
            minimumValue: 0.5,
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.03,
            opacity: 0.8,
            color: {
              value: isDark ? '#ffffff' : '#D4AF37',
            },
          },
        },
      },
      detectRetina: true,
    }),
    [isDark]
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Particles
          key={theme}
          id="tsparticles"
          options={options}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </ParticlesProvider>
  );
};

export default ParticleBackground;
