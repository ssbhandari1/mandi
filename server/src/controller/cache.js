const NodeCache = require('node-cache');
const Product = require('../models/product');
const cache = new NodeCache(200);

const cached = {
    getFromCache: (key) => {
        return cache.get(key);
    },
    setToCache: (key, data,) => {
        cache.set(key, data);
    },
};

// const invalidateCache = async({product, order, admin}) => {

//      if(product) {
//       const productKeys = ['latestProducts', 'categories', 'adminProduct']

//       const products = await Product.find({}).select("_id")
//       products.forEach((i) => {
//         productKeys.push(`singleProduct${i.id}`)
//       })
//       cache.del(productKeys)
//      }
//      if(order) {

//      }
//      if(admin) {

//      }
     
// }

module.exports = { cached }