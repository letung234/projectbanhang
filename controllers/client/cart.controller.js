const Cart = require("../../models/cart.model")
const Product= require("../../models/product.model")
const productsHelper = require("../../helpers/products")
module.exports.addPost =async(req,res) =>{
    const cartId = req.cookies.cartId
    const productId= req.params.productId
    const quantity=parseInt(req.body.quantity)

    const cart = await Cart.findOne({
        _id: cartId
    })
    const cartProducts = cart.products
    const existProductInCart = cartProducts.find(item => item.product_id == productId)
    if(existProductInCart){
        console.log("cap nhat so luong")
        const newQuantity = quantity +existProductInCart.quantity
        await Cart.updateOne(
            {
                _id:cartId,
                'products.product_id':productId
            },
            {
                'products.$.quantity': newQuantity
            }

        )

    }else{
        const objectCart = {
            product_id: productId,
            quantity: quantity
          };
      
          await Cart.updateOne(
            {
              _id: cartId
            },
            {
              $push: { products: objectCart }
            }
          ); 
    }
    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công!");
    res.redirect("back");

}

module.exports.index = async (req,res) =>{
  const cartId = req.cookies.cartId
  const cart = await Cart.findOne({
    _id:cartId
  })
  if(cart.products.length >0){
    for (const item of cart.products) {
      const productId=item.product_id

      const productInfo = await Product.findOne({
        _id:productId
      })
      productInfo.priceNew=productsHelper.priceNewProduct(productInfo)

      item.productInfo=productInfo

      item.totalPrice=item.quantity*productInfo.priceNew


      
    }
    
  }
  cart.totalPrice=cart.products.reduce((sum,item) => sum+item.totalPrice,0)

  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hảng",
    cartDetail: cart
    
  });
}
module.exports.delete = async(req,res) =>{
  const id= req.params.productId
  const cartId= req.cookies.cartId
  await Cart.updateOne({
    _id:cartId
  },{
    "$pull": { products: { "product_id": id } }
  })

  req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng!")

  res.redirect("back");
}

module.exports.update = async(req,res) =>{
  const id=req.params.productId
  const quantity =req.params.quantity
  const cartId = req.cookies.cartId;
  await Cart.updateOne(
    {
      _id: cartId,
      'products.product_id': id
    },
    {
      'products.$.quantity': quantity
    }
  );
  req.flash("success","Đã cập nhật số lượng!")
  res.redirect("back");
}