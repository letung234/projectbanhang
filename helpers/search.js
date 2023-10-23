module.exports=(query) =>{
    let objectSearch ={
        keyword:"",
        regex:""
    }
    if(query){
        objectSearch.keyword=query
        const regex= new RegExp(query,"i")
        objectSearch.regex=regex
        
    }
    return objectSearch
}