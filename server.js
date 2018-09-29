import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

var url = process.env.MONGODB_URI;

if (url) {
  console.log('connected url db')
  mongoose.connect(url, { useNewUrlParser: true });
} else {
  mongoose.connect('mongodb://localhost:27017/issues', { useNewUrlParser: true });
}

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

var products = require('./routes/products.js');
app.use('/products', products);

app.use('/', router);

app.listen((process.env.PORT || 4000), () => console.log(`Express server running on port 4000`));
