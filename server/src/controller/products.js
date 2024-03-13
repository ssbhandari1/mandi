const Product = require("../models/product.js");
const {rm} =require('fs');
const { cached } = require("./cache.js");
const User = require("../models/user.js");
// const casual = require('casual');
const newProduct=async(req, res, next)=>{
try {
    const {title, price, stock, category} = req.body;
    const photo = req.file;

    if(!photo)
    return res.status(400).json({
        success:false,
        message:"Please add photo",
    })

    if(!photo || !price || !stock || !category)
 { 
    rm(photo.path, () => {
        console.log('Deleted')
    })
    return res.status(400).json({
        success:false,
        message:"Please fill all the field",
    })}
    await Product.create({
        title,
        price,
        stock,
        category: category.toLowerCase(),
        photo:photo?.path,
    })
    
    // await invalidateCache({product: true})

    return res.status(201).json({
        success:true,
        message:"Product Created SuccessFully",
    })
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal  Error",
    })
}

}

// Revalidate on New Update,Delete product and on New order
const getLatestProducts=async(req, res, next)=>{
try {
    const cachedData = cached.getFromCache("latestProducts");
    if (cachedData) {
        return res.status(200).json({
            success: true,
            products: cachedData,
            message: 'Data retrieved from cache',
        });
    }
    let products = await Product.find({}).sort({ price: 1 });
    cached.setToCache("latestProducts", products);

    return res.status(200).json({
        success: true,
        products,
        message: 'Data retrieved from the database',
    });
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"Internal  Error",
    })
}
}

// Revalidate on New Update,Delete product and on New order
const getAllCategory=async(req, res, next)=>{
    try {
        const cachedData = cached.getFromCache("categories");
        if(cachedData){
            return res.status(200).json({
                success: true,
                categories: cachedData,
                message: 'Data retrieved from cache',
            }); 
        }
        const categories = await Product.distinct('category')
        cached.setToCache("categories", categories);
        return res.status(200).json({
            success:true,
            categories,
            message: 'Data retrieved from the database',
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server Error",
        })
    }
    }

// Revalidate on New Update,Delete product and on New order
    const getAdminProduct=async(req, res, next)=>{
        try {
            const cachedData = cached.getFromCache("adminProduct");
            if(cachedData){
                return res.status(200).json({
                    success: true,
                    products: cachedData,
                    message: 'Data retrieved from cache',
                }); 
            }
            const products = await Product.find({})
            cached.setToCache("adminProduct", products);
            return res.status(200).json({
                success:true,
                products,
                message: 'Data retrieved from the database',

            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Internal  Error",
            })
        }
        }

// Revalidate on New Update,Delete product and on New order
       const getSingleProduct=async(req, res, next)=>{
        const id = req.params.id;
        console.log(req.params)
            try {
                // const cachedData = cached.getFromCache(`singleProduct${id}`);
                // if(cachedData){
                //     return res.status(200).json({
                //         success: true,
                //         products: cachedData,
                //         message: 'Data retrieved from cache',
                //     }); 
                // }
                const products = await Product.findById(id)
                console.log(products)
               if(!products)
               return res.status(400).json({
                success:false,
                message:"Product Not found",
            })
            // cached.setToCache(`singleProduct${id}`, products);

                return res.status(200).json({
                    success:true,
                    products,
                    message: 'Data retrieved from the database',

                })
            } catch (error) {
                return res.status(500).json({
                    success:false,
                    message:"Internal  Error",
                })
            }
            }


            const updateProduct=async(req, res, next)=>{
                  
                try {
                    const {id} = req.params;
                    const {username, price, stock, category} = req.body;
                    const photo = req.file;
                    const product = await Product.findById(id);
                
                    if(!product)
                    return res.status(400).json({
                     success:false,
                     message:"Product Not found",
                 })
                 
                
                    if(photo)
                 { 
                    rm(product.photo, () => {
                        console.log('Old photo  Deleted')
                    })
                    
                 product.photo = photo.path;
                }

                if(username) product.username = username;
                if(price) product.price = price;
                if(stock) product.stock = stock;
                if(category) product.category = category;
                 await product.save()

                //  await invalidateCache({product: true})
                    return res.status(200).json({
                        success:true,
                        message:"Product updated SuccessFully",
                    })
                } catch (error) {
                    return res.status(500).json({
                        success:false,
                        message:"Internal  Error",
                    })
                }
                
      }

      const deleteProduct=async(req, res, next)=>{
        try {
            const product = await Product.findById(req.params.id)
            if(!product)
            return res.status(400).json({
             success:false,
             message:"Product Not found",
         })
         rm(product.photo, () => {
            console.log('Product Photo Deleted')
        })

         await Product.deleteOne();
        //  await invalidateCache({product: true})

            return res.status(200).json({
                success:true,
                 message:"Product Deleted Successfully",
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Internal  Error",
            })
        }
        }


        const searchAllProducts=async(req, res, next)=>{
            const {search, sort, category, price} = req.query;
            const page = Number(req.query.page)

             const limit = process.env.PRODUCT_PER_PAGE || 8;
             const skip = (page - 1)* limit;
            
             const baseQuery ={};

             if(search)
             baseQuery.username = {
                $regex:search,
                $options:"i",
            };

            if(price)
            baseQuery.price = {
                $lte:price,
            };
            if(category) baseQuery.category = category;

          try {
            const [products, filteredProduct ] = await Promise.all([
                Product.find(baseQuery).sort( sort && {price: sort ==="asc" ? 1 : -1}).limit(limit).skip(skip),
                Product.find(baseQuery)
            ])
                const totalPage = Math.ceil(filteredProduct.length / limit);
                return res.status(200).json({
                    success: true,
                    products,
                    totalPage,
                })

            } catch (error) {
                return res.status(500).json({
                    success:false,
                    message:"Internal  Error",
                })
            }
            }

            const addProduct = async(req, res, next) => {
                const { productId, userId } = req.body;
                try {
                   const product = await Product.findById(productId)
                   const user = await User.findById(userId)
                   if(user.addProduct.includes(productId)){
                    return res.status(404).json({
                        success: false,
                        addProduct: user.addProduct,
                        message: 'Product Already in Cart',
                    });
                   }
                   user.addProduct.push(product)
                   await user.save()
                    return res.status(200).json({
                        success: true,
                        addProduct: user.addProduct,
                        message: 'Product Add successfully',
                    });
                } catch (error) {
                    return res.status(500).json({
                        success:false,
                        message:"Internal Server Error",
                    })
                }
                }


                
          
            // const foodItems = [
            //     'Apple',
            //     'Banana',
            //     'Orange',
            //     'Carrot',
            //     'Broccoli',
            //     'Grapes',
            //     'Tomato',
            //     'Spinach',
            //     // Add more food items as needed
            //   ];
              
            //   const getRandomFoodItem = () => casual.random_element(foodItems);
              
            //   const generateFakeFoodProduct = async (count) => {
            //     try {
            //       const foodProducts = [];
            //       for (let i = 0; i < count; i++) {
            //         const foodProduct = {
            //           title: getRandomFoodItem(),
            //           photo: `uploads\\${casual.uuid}.png`,
            //           stock: casual.integer(from = 0, to = 100),
            //           price: casual.integer(from = 1, to = 20), // Adjust price range for fruits and vegetables
            //           category: casual.random_element(['Fruits', 'Vegetables']),
            //           createdAt: casual.date('YYYY-MM-DDTHH:mm:ssZ'),
            //           updatedAt: casual.date('YYYY-MM-DDTHH:mm:ssZ'),
            //           _v: 0,
            //         };
              
            //         foodProducts.push(foodProduct);
            //       }
              
            //       await Product.create(foodProducts);
            //       console.log({ success: true });
            //     } catch (error) {
            //       console.error('Error generating or inserting fake food products:', error);
            //     }
            //   };
              
            //   // Call the function with the desired count
            //   const numberOfFoodProducts = 40; // Change this to the desired number of fake food products
            //   generateFakeFoodProduct(numberOfFoodProducts);
              


              

module.exports = {newProduct, searchAllProducts, getLatestProducts, getAllCategory, getAdminProduct, getSingleProduct,updateProduct, deleteProduct, addProduct}