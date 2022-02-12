var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const port = process.env.PORT || 4000

// Initialize a GraphQL schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Root resolver
var root = { 
  hello: () => 'Hello world!'
};

// Create an express server and a GraphQL endpoint
var app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,  // Must be provided
  rootValue: root,
  graphiql: false,  // Enable GraphiQL when server endpoint is accessed in browser
}));

app.get('/graphql-fetch', function(request, response){
    response.sendFile("fetch_demo.html", { root: '.' });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})