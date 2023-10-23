const Product =require("../../models/product.model")
const ProductCategory=require("../../models/product-category.model")
const productsHelper = require("../../helpers/products");
const getSubCategoryHelper=require("../../helpers/getSubCategory")

module.exports.index= async (req, res) => {
    const products= await Product.find({
        deleted:false,
        status:"active"
    }).sort({ position: "desc" })
    const newItem= productsHelper.priceNewProducts(products)
    res.render("client/pages/product/index",{
        pageTitle: "Trang danh sach sp",
        Products:newItem
    })
}
module.exports.add=(req, res) => {
    res.render("client/pages/add/index",{
        pageTitle: "Trang add sp"
        
    })
}

module.exports.detail= async (req,res) =>{
    try {
        const slug = req.params.slugProduct;
    
        const product = await Product.findOne({
          slug: slug,
          deleted: false,
          status: "active"
        });
        if(product.product_category_id) {
          const category = await ProductCategory.findOne({
            _id: product.product_category_id,
            deleted: false,
            status: "active"
          });
    
          product.category = category;
        }
        product.priceNew = productsHelper.priceNewProduct(product);    
        res.render("client/pages/product/detail", {
          pageTitle: "Chi tiết sản phẩm",
          product: product
        });
      } catch (error) {
        res.redirect("/");
      }
}
module.exports.category = async(req,res) =>{
  try {
    const slugCategory = req.params.slugCategory;
    const category = await ProductCategory.findOne({
      slug: slugCategory,
      deleted: false,
      status: "active"
    });
    const listSubCategory =  await getSubCategoryHelper.getSubCategory(category.id)
    const listSubCategoryId= listSubCategory.map(item => item.id)

    const products = await Product.find({
      product_category_id: { $in: [category.id, ...listSubCategoryId] },
      status: "active",
      deleted: false
    }).sort({ position: "desc" });
    const newProducts = await productsHelper.priceNewProducts(products);
    res.render("client/pages/product/index", {
      pageTitle: category.title,
      Products: newProducts
    });
  
  } catch (error) {
    res.redirect("/products")
  }
  
}