require('dotenv').config({ path: './config.env' });
require('./src/db/mongoose'); // CONNECT TO DATABASE
const app = require('./src/app');

// FIRE UP SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is up on port ${port}`));
