module.exports.dashboard =(req,res) =>{
    console.log("ok nhé bạn")
    res.render('admin/pages/dashboard/index',{
        pageTitle :"Tong quan"
    })
}