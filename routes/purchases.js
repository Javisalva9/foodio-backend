import Product from '../models/Product';
import Purchase from '../models/Purchase';

var express = require('express');
var router = express.Router();

// define the home page route
router.route('/get').get((req, res) => {
  Purchase.find().populate('products','name').exec((err, purchases) => {
      if (err)
          console.log(err);
      else
        console.log('los purchases', purchases)
        res.json(purchases);
  });
});

router.route('/add').post((req,res) => {
  let purchase = new Purchase();
  purchase.products = req.body;
  // console.log(req.body);
  //
  // const productsOnPurchase = req.body.map((product) => {
  //   return new Product(product);
  // });
  //
  // console.log("productsOnPurchase",productsOnPurchase)

  console.log(purchase);

  purchase.save()
    .then(purchase => {
      res.status(200).json({'purchase': 'Added successfully'});
  })
    .catch(err => {
      res.status(400).send('Failed to create new purchase');
    });
})




module.exports = router;
