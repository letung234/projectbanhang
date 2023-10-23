const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

module.exports.index = async(req,res) =>{
   
    const records = await Account.find({
        deleted: false,
      });
      for (const record of records) {
        const role = await Role.findOne({ _id: record.role_id });
        record.role = role;
      }
        
      res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records,
      });  
}
module.exports.create = async(req,res) =>{
    const roles = await Role.find({
        deleted: false,
      });
    
      res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản",
        roles: roles,
      });
}
module.exports.createPost = async(req,res) =>{
    req.body.password=md5(req.body.password)
    const record = new Account(req.body)

    await record.save()
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    
}
module.exports.edit = async (req,res) =>{
    const id= req.params.id
    try {
        const data = await Account.findOne({
            _id:id,
            deleted: false
    
        })
        const roles = await Role.find({
            deleted: false,
          });
          res.render("admin/pages/accounts/edit", {
            pageTitle: "Chinh sua tài khoản",
            data:data,
            roles: roles,
           
          });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
    

   
}
module.exports.editPatch = async(req,res) =>{
    
    if(req.body.password) {
        req.body.password = md5(req.body.password);
    } else {
        delete req.body.password;
    }

    await Account.updateOne({ _id: req.params.id }, req.body);
    res.redirect("back");



}
module.exports.changeStatus = async(req,res) =>{
  const status= req.params.status
 
  const id=req.params.id

  await Account.updateOne({
    _id:id
  },{
    status:status
  })
  res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
}