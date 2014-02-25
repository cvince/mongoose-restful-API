var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    mongoose = require('mongoose');

var app = express.createServer();

// Database

mongoose.connect('mongodb://localhost/ecomm_database');

// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var Schema = mongoose.Schema;

var Product = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    style: { type: String, unique: true },
    modified: { type: Date, default: Date.now }
});


//var Product = require('./models/schema.js')(mongoose, Schema);

// var Product = new Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     style: { type: String, unique: true },
//     images: [Images],
//     categories: [Categories],
//     catalogs: [Catalogs],
//     variants: [Variants],
//     modified: { type: Date, default: Date.now }
// });

var ProductModel = mongoose.model('Product', Product);

app.get('/api/products');

app.get('/api', function (req, res) {
  res.send('Ecomm API is running');
});

app.get('/api/products', function (req, res){
  return ProductModel.find(function (err, products) {
    if (!err) {
      return res.send(products);
    } else {
      return console.log(err);
    }
  });
});

app.get('/api/products/:id', function (req, res){
  ProductModel.findById(req.params.id, function (err, product) {
    console.log(product);
    if (product == null){
      res.send('Error: not found');
    } else if (!err) {
      res.send(product.title +' '+product.description);
    } else {
      res.send('not found');
    }
  });
});

app.post('/api/products', function (req, res){
  var product;
  console.log("POST: ");
  console.log(req.body);
  product = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    style: req.body.style,
  });
  product.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(product);
});


app.put('/api/products/:id', function (req, res){
  return ProductModel.findById(req.params.id, function (err, product) {
    product.title = req.body.title;
    product.description = req.body.description;
    product.style = req.body.style;
    return product.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});

app.delete('/api/products/:id', function (req, res){
  return ProductModel.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
});

// Launch server

app.listen(4242);
