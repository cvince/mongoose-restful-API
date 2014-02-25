 module.exports.Schemas = function() {

// Schemas

var Sizes = new Schema({
    size: { type: String, required: true },
    available: { type: Number, required: true, min: 0, max: 1000 },
    sku: {
        type: String,
        required: true,
        validate: [/[a-zA-Z0-9]/, 'Product sku should only have letters and numbers']
    },
    price: { type: Number, required: true, min: 0 }
});

var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'catalog', 'detail', 'zoom'],
        required: true
    },
    url: { type: String, required: true }
});

var Variants = new Schema({
    color: String,
    images: [Images],
    sizes: [Sizes]
});

var Categories = new Schema({
    name: String
});

var Catalogs = new Schema({
    name: String
});

 }
