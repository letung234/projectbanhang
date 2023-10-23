const systemConfig = require("../../config/system");
const Product =require("../../models/product.model")
const paginationHelper=require("../../helpers/pagination")
const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");
const Account = require("../../models/account.model");
module.exports.index = async (req,res) =>{
    let find={
        deleted:false
    }
    const filter=require("../../helpers/filterStatus")

    const filterStatus=filter(req.query.status)
    
    if(req.query.status){
        find.status=req.query.status
    }
    
    
    const search=require("../../helpers/search")

    const object=search(req.query.keyword)

    if(object.regex !=""){
        find.title=object.regex
    }
    let initPagination={
        currentPage:1,
        limitItems:4
    }
    const countProducts=await Product.count(find)
    let objectPagination=paginationHelper(req.query.page,initPagination,countProducts)
    let sort={}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort.position = "desc";
    }

    


    const products= await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort(sort)
    for (const product of products) {
        // Lấy ra người tạo
        const userCreated = await Account.findOne({
          _id: product.createdBy.account_id
        });
  
        if(userCreated) {
          product.createdBy.accountFullName = userCreated.fullName;
        }
        // Lấy ra người sửa
        const userUpdatedId = product.updatedBy.slice(-1)[0];
        if(userUpdatedId) {
          const userUpdated = await Account.findOne({
            _id: userUpdatedId.account_id
          });
  
  
          if(userUpdated) {
            userUpdatedId.accountFullName = userUpdated.fullName;
          }
      }
    }
    
        res.render("admin/pages/products/index",{
            pageTitle:"Danh sach san pham",
            Products:products,
            filterStatus:filterStatus,
            keyword:object.keyword,
            pagination: objectPagination
            
        })

    
   
   
}



module.exports.changeStatus= async (req,res) =>{
    const status=req.params.status
    const id=req.params.id
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date(),
      };
    await Product.updateOne({_id:id},{
        status:status,
        $push: { updatedBy: updatedBy }
    })

    res.redirect("back")
}
module.exports.changeMulti=async(req,res) =>{
    const type=req.body.type
    const ids=req.body.ids.split(", ")
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date(),
      };
    
    switch(type){
        case "active":
        case "inactive":
            await Product.updateMany({ _id: {$in: ids} }, { 
                status: type ,
                $push: { updatedBy: updatedBy }
            });
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: {$in: ids} }, { deleted:true ,deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date(),
              }});
            req.flash("success", `DELETE thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            for (const item of ids) {
                const [id, position] = item.split("-");
                await Product.updateOne({ _id: id }, {
                    position: position ,
                    $push: { updatedBy: updatedBy }
                });
              }
              req.flash("success", `Change position thành công ${ids.length} sản phẩm!`);
              break;  
            break;      
        default:
            break;
    }
    res.redirect("back")



}
module.exports.delete= async (req,res) =>{
    const id=req.params.id
    // await Product.deleteOne({_id:id})
    await Product.updateOne({_id:id},{
        deleted:true,
        deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date(),
          }
    })

   

    res.redirect("back")

}
module.exports.bin=async (req,res) =>{
    let find={
        deleted:true
    }
    const products= await Product.find(find)
    res.render("admin/pages/bin/index",{
        pageTitle:"Danh sach san pham da xoa",
        Products:products
       
        
    })
    
}
module.exports.restore= async(req,res) =>{
    const id=req.params.id
    await Product.updateOne({_id:id},{deleted:false,})
    res.redirect("back")
}
module.exports.create = async(req,res) =>{
    let find = {
        deleted: false
      }
    
      const records = await ProductCategory.find(find);
    
      const newRecords = createTree(records);
    res.render("admin/pages/products/create",{
        pageTitle:"Tao moi san pham",
        records:newRecords
       
       
        
    })
}

module.exports.createPost=async(req,res) =>{
    req.body.price=parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock)
    if(req.body.position === ""){
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1;
    }
    else{
        req.body.position = parseInt(req.body.position);
    }
    req.body.createdBy = {
        account_id: res.locals.user.id
      };
    const product=new Product(req.body)
    await product.save()

    res.redirect(`/${systemConfig.prefixAdmin}/products`)

}
module.exports.edit = async (req,res) =>{
    const id=req.params.id
    const product=await Product.findOne({
        _id:id,
        deleted:false

    })
    let find = {
        deleted: false
      }
    
      const records = await ProductCategory.find(find);
    
      const newRecords = createTree(records);
    res.render("admin/pages/products/edit",{
        pageTitle:"Chinh sua san pham",
        product:product,
        records:newRecords
    })
}
module.exports.editPatch =async (req,res) =>{
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    req.body.position = parseInt(req.body.position);
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date(),
      };
    
    await Product.updateOne({ _id: id }, {
        ...req.body,
        $push: { updatedBy: updatedBy }
    });

    req.flash("success", "Cập nhật sản phẩm thành công!");

    res.redirect("back");

}

module.exports.detail = async(req,res) =>{
    try {
        const id = req.params.id;
    
        const product = await Product.findOne({
          _id: id,
          deleted: false
        });
    
        res.render("admin/pages/products/detail", {
          pageTitle: "Chi tiết sản phẩm",
          product: product
        });
      } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
      }

}
