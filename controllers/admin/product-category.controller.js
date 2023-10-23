const ProductCategory = require("../../models/product-category.model");
const createTree=require("../../helpers/createTree")
const systemConfig = require("../../config/system"); 
const { model } = require("mongoose");

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
      }
    
    const records = await ProductCategory.find(find);
    
    const newRecords = createTree(records);

  
  
    res.render("admin/pages/products-category/index", {
      pageTitle: "Danh mục sản phẩm",
      records: newRecords
      
    });
  }
module.exports.create = async (req, res) => {
    let find = {
      deleted: false
    }
  
    const records = await ProductCategory.find(find);
  
    const newRecords = createTree(records);
  
    res.render("admin/pages/products-category/create", {
      pageTitle: "Tạo Danh mục sản phẩm",
      records: newRecords
    });
}
  
module.exports.createPost = async (req, res) => {
    if(req.body.position === "") {
      const countRecords = await ProductCategory.countDocuments();
      req.body.position = countRecords + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
  
    const record = new ProductCategory(req.body);
    await record.save();
  
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
  };  

module.exports.edit=async(req,res) =>{
    try {
      const id = req.params.id;

      const data = await ProductCategory.findOne({
          _id: id,
          deleted: false
      });

      const records = await ProductCategory.find({
              deleted: false
      });

      const newRecords = createTree(records);
      res.render("admin/pages/products-category/edit", {
        pageTitle: "Chỉnh sửa Danh mục sản phẩm",
        data: data,
        records: newRecords
      
      });
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
  }

module.exports.editPatch=async(req,res) =>{
    try {
      const id = req.params.id;

      req.body.position = parseInt(req.body.position);

      await ProductCategory.updateOne({ _id: id }, req.body);

      res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
      
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}
module.exports.detail = async (req,res) =>{
  
    const id=req.params.id
    const productCategory= await ProductCategory.findOne({
      _id:id
    })
      if(productCategory.parent_id !=""){
        const productParent= await ProductCategory.findOne({
          _id:productCategory.parent_id
        })
        productCategory.parent_title =productParent.title
      }
    res.render("admin/pages/products-category/detail", {
      pageTitle: "Chi tiet danh muc san pham",
      product:productCategory
    
    });
  
}
module.exports.delete = async(req,res) =>{
  const id = req.params.productCategoryId
  await ProductCategory.updateOne({
    _id:id
  },{
    deleted:true
  })
  res.redirect("back")
}