/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'local-image': "url('/src/assets/card-table.png')",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '13': 'repeat(13, minmax(0, 1fr))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      keyframes: {
        moveAndFlip: {
          '0%': { transform: 'translate(0, 0) rotateY(0)' },
          '50%': { transform: 'translate(100px, 100px) rotateY(90deg)' },
          '100%': { transform: 'translate(200px, 200px) rotateY(180deg)' },
        },
      },
    },
  },
  plugins: [],
}

