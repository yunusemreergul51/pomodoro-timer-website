/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pomodoro: {
          work: '#E11D48',      // Energetic Rose / Coral Red
          workDark: '#9F1239',
          shortBreak: '#0D9488', // Refreshing Teal
          shortBreakDark: '#115E59',
          longBreak: '#2563EB',  // Relaxing Indigo / Blue
          longBreakDark: '#1E40AF',
        }
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
