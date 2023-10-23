const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloude.middleware");



router.get("/", controller.index);
router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  controller.createPost
);
router.get("/edit/:id",controller.edit)
router.patch("/edit/:id",upload.single("thumbnail"),
uploadCloud.upload,controller.editPatch)
router.get("/detail/:id",controller.detail)
router.delete("/delete/:productCategoryId",controller.delete)

module.exports = router;
