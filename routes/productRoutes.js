const { Router } = require("express");
const productControllers = require("../controllers/productControllers");

const router = Router();

router.post("/createCategory", productControllers.createCategory);
router.get("/getCategory", productControllers.getCategory);
router.get("/getSubCategory/:category", productControllers.getSubCategory);
router.post("/createProduct", productControllers.createProduct);
router.get("/getProductList", productControllers.getProductList);
router.post("/addSubCategory", productControllers.addSubCategory);
router.post("/editProduct", productControllers.editProduct);
router.post("/deleteProduct", productControllers.deleteProduct);

module.exports = router;
