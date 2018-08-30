import Product from '../models/Product';

var express = require('express');
var router = express.Router();

// define the home page route
router.route('/get').get((req, res) => {
  Product.find((err, products) => {
      if (err)
          console.log(err);
      else
        console.log('los productos', products)
        res.json(products);
  });
});

router.route('/add').post((req,res) => {
  let product = new Product(req.body);
  product.save()
    .then(product => {
      res.status(200).json({'product': 'Added successfully'});
  })
    .catch(err => {
      res.status(400).send('Failed to create new product');
    });
})

router.route('/delete/:id').delete((req,res) => {
  Product.findByIdAndRemove({_id: req.params.id}, (err, product) => {
      if (err)
        res.json(err);
      else
        console.log('delete', product)
        res.json('Removed successfully');
  });
});

module.exports = router;
