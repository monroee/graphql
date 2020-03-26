const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const ip = require('ip');

const app = express();

// allow cross origin requests 
app.use(cors());

// connection to mongodb
const MONGODB_URI = "mongodb+srv://admin:amon1234@cluster-for-testing-wokqh.mongodb.net/graphql?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.catch(err => console.log('Unable to connect to mongo database ...'));

mongoose.connection.once('open', () => {
    console.log('Successfuly connected to mongodb server ...');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(8888, () => {
    console.log(`Server now listening ...`);
    console.log(`Local: http://localhost:8888`); 
    console.log(`Network: http://${ip.address()}:8888`);
});