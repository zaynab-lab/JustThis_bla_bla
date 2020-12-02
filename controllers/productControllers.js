const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.createCategory = async (req, res) => {
  const token = req.cookies.jwt;
  const { body } = req;

  if (!token) return res.end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    const user = await UserModel.findById(decoded.id).exec();
    if (user.roles.includes("GM")) {
      const createdCategory = new CategoryModel({
        name: body.name,
        title: body.title
      });
      await createdCategory.save().catch((err) => console.log(err));
      return res.end("done");
    }
    return res.end("invalid");
  });
};

module.exports.getCategory = async (req, res) => {
  const { body } = req;
  if (body.id) {
    const category = await CategoryModel.findById(body.id).exec();
    res.end(category);
  } else {
    const categoryList = await CategoryModel.find().exec();
    res.end(JSON.stringify(categoryList));
  }
  res.end("invalid");
};

module.exports.getSubCategory = async (req, res) => {
  const { params } = req;
  const category = await CategoryModel.findOne({
    name: params.category
  }).exec();
  res.end(JSON.stringify(category.subCategory));
};

module.exports.addSubCategory = async (req, res) => {
  const { body } = req;
  const category = await CategoryModel.findOne({
    name: body.category
  }).exec();
  const newSubCategory = category.subCategory;
  newSubCategory.push(body.subCategory);

  await CategoryModel.findByIdAndUpdate(
    category._id,
    { subCategory: newSubCategory },
    (err) => console.log(err)
  ).then(res.end("done"));
};

module.exports.createProduct = async (req, res) => {
  const { body } = req;
  const token = req.cookies.jwt;
  if (!token) return res.end("noToken");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.end("invalid");
    const user = await UserModel.findById(decoded.id).exec();
    if (user.roles.includes("productsManager")) {
      const createdProduct = new ProductModel({
        name: body.name,
        brand: body.brand,
        category: body.category,
        subCategory: body.subCategory,
        initprice: body.initprice,
        price: body.price,
        measure: body.measure,
        img: body.img,
        description: body.description
      });
      await createdProduct.save().catch((err) => console.log(err));
      return res.end("done");
    }
    return res.end("invalid");
  });
};
module.exports.getProductList = async (req, res) => {
  const productList = await ProductModel.find().exec();
  return res.end(JSON.stringify(productList));
};
module.exports.editProduct = async (req, res) => {};

module.exports.deleteProduct = async (req, res) => {};
