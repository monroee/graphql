const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross origin requests 
app.use(cors());

// connection to mongodb
const MONGODB_URI = "mongodb+srv://admin:amon1234@cluster-for-testing-wokqh.mongodb.net/graphql?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch(err => console.log('unable to connect to mongo database'));

mongoose.connection.once('open', () => {
    console.log('connected to mongo database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8888, () => {
    console.log(`Server listening on http://localhost:8888`);
});