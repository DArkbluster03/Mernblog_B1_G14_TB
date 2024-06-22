const flowbite = require('flowbite/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', // Include Flowbite React content
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite, // Use the required flowbite plugin correctly
  ],
};
