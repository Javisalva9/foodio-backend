import mongoose from 'mongoose';
import Product from './Product';

// const Product = require('./Product')
const Schema = mongoose.Schema;

let Purchase = new Schema({
    products: {
        type: [{type:Schema.Types.ObjectId, ref:'Product'}],
        required: true
    },
    price: {
        type: Number
    },
    date: {
      type: Date,
      default: Date.now
    }
});

export default mongoose.model('Purchase', Purchase);
