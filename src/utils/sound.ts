// Web Audio API Sound Synthesizer
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a warm, harmonic meditation bell / Tibetan bowl sound
 */
function playBell(ctx: AudioContext, gainNode: GainNode): void {
  const now = ctx.currentTime;
  const frequencies = [587.33, 880, 1174.66]; // D5, A5, D6 harmonic chord
  
  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    
    // Smooth bell envelope with long decay
    oscGain.gain.setValueAtTime(0.3 / (idx + 1), now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
    
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    
    osc.start(now);
    osc.stop(now + 2.5);
  });
}

/**
 * Plays a modern, pleasant 2-tone melodic chime
 */
function playChime(ctx: AudioContext, gainNode: GainNode): void {
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    const noteTime = now + i * 0.12;
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, noteTime);
    
    oscGain.gain.setValueAtTime(0.4, noteTime);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 1.2);
    
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    
    osc.start(noteTime);
    osc.stop(noteTime + 1.2);
  });
}

/**
 * Plays a classic digital watch/timer beep
 */
function playDigital(ctx: AudioContext, gainNode: GainNode): void {
  const now = ctx.currentTime;
  const beeps = [0, 0.15, 0.3];
  
  beeps.forEach((startOffset) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    const beepTime = now + startOffset;
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, beepTime);
    
    oscGain.gain.setValueAtTime(0.2, beepTime);
    oscGain.gain.setValueAtTime(0, beepTime + 0.08);
    
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    
    osc.start(beepTime);
    osc.stop(beepTime + 0.08);
  });
}

export function playAlarmSound(type: 'bell' | 'chime' | 'digital' = 'bell', volume = 70): void {
  if (volume <= 0) return;
  try {
    const ctx = getAudioContext();
    const masterGain = ctx.createGain();
    // Exponential curve for human ear perception
    masterGain.gain.value = Math.max(0.01, (volume / 100) * 0.8);
    masterGain.connect(ctx.destination);

    switch (type) {
      case 'bell':
        playBell(ctx, masterGain);
        break;
      case 'chime':
        playChime(ctx, masterGain);
        break;
      case 'digital':
        playDigital(ctx, masterGain);
        break;
      default:
        playBell(ctx, masterGain);
    }
  } catch (err) {
    console.warn('Audio playback not permitted yet or failed:', err);
  }
}
