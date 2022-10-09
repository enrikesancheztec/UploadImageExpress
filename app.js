const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const apiRoutes = require("./routes/imagemanager.routes");

// App
const app = express()
// Morgan
app.use(morgan('tiny'))

app.use(express.json());
app.use(cors());

// Add routes
app.use('/', apiRoutes);

// Starting server
const PORT = process.env.PORT || 3000
module.exports = app.listen(PORT);