const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./src/app');

// console.log(process.env);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('The server is up at http://localhost:4000');
});
