import confetti from 'canvas-confetti';

export function fireCelebration(): void {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E11D48', '#0D9488', '#2563EB', '#F59E0B'],
      disableForReducedMotion: true,
    });
  } catch (e) {
    console.error('Confetti failed to trigger', e);
  }
}
