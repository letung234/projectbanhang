module.exports =(query) =>{
    let filterStatus=[
        {
            name:"Tat ca",
            status:"",
            class:""
        },
        {
            name:"Dang hoat dong",
            status:"active",
            class:""
        },
        {
            name:"Dung hoat dong",
            status:"inactive",
            class:""
        }
    ]
    if(query){
        const index=filterStatus.findIndex((item) =>{
            return item.status==query
        })
        filterStatus[index].class="active"
    }else{
        const index=filterStatus.findIndex((item) =>{
            return item.status==""
    
        })
        filterStatus[index].class="active"
    }
    return filterStatus
}