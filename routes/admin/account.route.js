const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const controller = require("../../controllers/admin/account.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloude.middleware");


router.get("/", controller.index);
router.get("/create",controller.create)

router.post("/create",upload.single("avatar"),uploadCloud.upload,controller.createPost)

router.get("/edit/:id",controller.edit)
router.patch("/edit/:id",upload.single("avatar"),uploadCloud.upload,controller.editPatch)
router.patch("/change-status/:status/:id",controller.changeStatus)
module.exports = router;