module.exports = function(mongoose, Schema) {

// var Post = new Schema({
//     title: String,
//     body: String,
//     date: Date
// });

var Schema = mongoose.Schema;

var Product = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    style: { type: String, unique: true },
    images: [Images],
    categories: [Categories],
    catalogs: [Catalogs],
    variants: [Variants],
    modified: { type: Date, default: Date.now }
});

return mongoose.model('Product', Product);

// return mongoose.model('Post', Post);

}
