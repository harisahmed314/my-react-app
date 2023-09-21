module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js', // if you're using JS templates
    './src/**/*.jsx', // for React
    './src/**/*.tsx', // for TypeScript with JSX
    './src/**/*.vue', // for Vue
    // add other file extensions as needed.
  ],
  theme:{
    extend:{
      colors:{
        primary:'#36454F'
      }, 
    },
  },
  plugins:[]
}