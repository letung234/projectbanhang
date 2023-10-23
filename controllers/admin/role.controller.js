const Role = require("../../models/role.model");

const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const records = await Role.find({
    deleted: false
  });

  res.render("admin/pages/roles/index", {
    pageTitle: "Danh sách nhóm quyền",
    records: records
  });
}
module.exports.create=async (req,res) =>{
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới nhóm quyền",
      });
}
module.exports.createPost =async(req,res) =>{
    
    const record = new Role(req.body);
    await record.save();
  
    req.flash("success", "Thêm nhóm quyền thành công");
  
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}
module.exports.edit = async (req,res) =>{
   try {
    const id = req.params.id;

    const data = await Role.findOne({
      _id: id,
      deleted: false
    });

    res.render("admin/pages/roles/edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data
    });
   } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
   } 
}
module.exports.editPatch = async (req,res) =>{
    const id= req.params.id

    await Role.updateOne({
        _id:id

    }, req.body
    )
    req.flash("success", "Cập nhật nhóm quyền thành công");

    res.redirect("back");
}
module.exports.permissions=async (req,res) =>{
    const records = await Role.find({
        deleted: false
      });
    
      res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records
      });
}
module.exports.permissionsPatch = async(req,res) =>{
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        await Role.updateOne(
          {
            _id: item.id
          },
          {
            permissions: item.permissions
          }
        );
      }
    req.flash("success", "Cập nhật phân quyền thành công!");

    res.redirect("back");  

}
module.exports.detail = async (req,res) =>{
  const id =req.params.rolesId
  const role = await Role.findOne({
    _id:id,
    deleted:false
  })
  res.render("admin/pages/roles/detail", {
    pageTitle: "Chi tiet nhom quyen",
    roles: role
  });
}
module.exports.delete = async (req,res) =>{
  const id =req.params.id
  await Role.updateOne({
    _id:id
  },{
    deleted:true
  })
  res.redirect("back")
}