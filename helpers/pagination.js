module.exports=(query,objectPagination,countProducts) =>{
    if(query){
        objectPagination.currentPage=parseInt(query)
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems; 
    


    objectPagination.totalPage = Math.ceil(countProducts/objectPagination.limitItems);
    return objectPagination
}