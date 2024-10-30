/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          // Latte (Light) theme
          rosewater: '#dc8a78',
          flamingo: '#dd7878',
          pink: '#ea76cb',
          mauve: '#8839ef',
          lavender: '#7287fd',
          blue: '#1e66f5',
          sky: '#04a5e5',
          teal: '#179299',
          green: '#40a02b',
          yellow: '#df8e1d',
          peach: '#fe640b',
          maroon: '#e64553',
          // Base colors
          crust: '#dce0e8',
          mantle: '#e6e9ef',
          base: '#eff1f5',
          surface0: '#ccd0da',
          surface1: '#bcc0cc',
          surface2: '#acb0be',
          overlay0: '#9ca0b0',
          overlay1: '#8c8fa1',
          text: '#4c4f69',
        },
        dark: {
          // Mocha (Dark) theme
          rosewater: '#f5e0dc',
          flamingo: '#f2cdcd',
          pink: '#f5c2e7',
          mauve: '#cba6f7',
          lavender: '#b4befe',
          blue: '#89b4fa',
          sky: '#89dceb',
          teal: '#94e2d5',
          green: '#a6e3a1',
          yellow: '#f9e2af',
          peach: '#fab387',
          maroon: '#eba0ac',
          // Base colors
          crust: '#11111b',
          mantle: '#181825',
          base: '#1e1e2e',
          surface0: '#313244',
          surface1: '#45475a',
          surface2: '#585b70',
          overlay0: '#6c7086',
          overlay1: '#7f849c',
          text: '#cdd6f4',
        }
      }
    },
  },
  plugins: [],
};
