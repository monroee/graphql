const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://admin:12341234@cluster-for-testing-wokqh.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8888, () => {
    console.log(`Server listening on http://localhost:8888`);
});