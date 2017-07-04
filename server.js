const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();
app.use(cors({
  credentials:true,
  origin:true
}))

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('listening');
});
