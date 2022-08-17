const express = require('express');
require('dotenv').config();
const colors = require('colors')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 5000;

// Connect to database
connectDB();
const app = express();
app.use(cors())

app.use('/graphiql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on port ${port}`))