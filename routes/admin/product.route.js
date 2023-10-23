const express=require("express")
const route = express.Router()
const controllers=require("../../controllers/admin/product.controller")
const multer = require("multer");
const validate=require("../../validates/admin/product.validate")
const uploadCloud=require("../../middlewares/admin/uploadCloude.middleware")

const upload = multer();

route.get("/",controllers.index)
route.patch("/change-status/:status/:id",controllers.changeStatus)
route.patch("/change-multi",controllers.changeMulti)
route.delete("/delete/:id",controllers.delete)
route.get("/bin",controllers.bin)
route.patch("/bin/:id",controllers.restore)
route.get("/create",controllers.create)
route.post("/create",upload.single("thumbnail"),uploadCloud.upload,validate.createPost,controllers.createPost)
route.get("/edit/:id",controllers.edit)
route.patch("/edit/:id",upload.single("thumbnail"),uploadCloud.upload,validate.createPost,controllers.editPatch)
route.get("/detail/:id",controllers.detail)
module.exports=route