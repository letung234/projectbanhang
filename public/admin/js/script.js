const buttons=document.querySelectorAll("[button-status]")
const formSearch=document.querySelector("#form-search")

if (buttons.length>0){
    let url=new URL(window.location.href)
    buttons.forEach((button) =>{
        button.addEventListener("click",() =>{
            const status=button.getAttribute("button-status")
            if(status !=""){
                url.searchParams.set("status",status)
            }
            else{
                url.searchParams.delete("status")

            }
            window.location.href=url.href

        })
    })
}
if(formSearch){
    let url=new URL(window.location.href)
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault()
        const value=document.querySelector(".form-control").value
       
        if(value !=""){
            url.searchParams.set("keyword",value)
        }
        else{
            url.searchParams.delete("keyword")

        }
        window.location.href=url.href

    })
}


const paginationButtons=document.querySelectorAll("[button-pagination]")
if(paginationButtons.length>0){
    let url=new URL(window.location.href)
    paginationButtons.forEach((button) =>{
        button.addEventListener("click",()=>{
            const page= button.getAttribute("button-pagination")
            url.searchParams.set("page",page)
            window.location.href=url.href
        })
    })
}


const buttonsChange=document.querySelectorAll("[button-change-status]")

if(buttonsChange.length>0){
    const formChange=document.querySelector("#form-change-status")
    const path=formChange.getAttribute("data-path")
    buttonsChange.forEach((button) =>{
        button.addEventListener("click",()=>{
            const statusCurrent=button.getAttribute("data-status")
            const id=button.getAttribute("data-id")
            const statusChange=statusCurrent=="active"?"inactive":"active"

            const action=path+`/${statusChange}/${id}?_method=PATCH`
            formChange.action=action

            formChange.submit()
            
        })
    })
}


const formcheckbox=document.querySelector("[checkbox-multi]")
if(formcheckbox){
    const checks=formcheckbox.querySelectorAll("input[name='id']")
    const checkall=formcheckbox.querySelector("input[name='checkall']")
    checkall.addEventListener("click",() =>{
        if(checkall.checked==true){
            checks.forEach(check =>{
                check.checked=true
            })

        }
        else{
            checks.forEach(check =>{
                check.checked=false
            })
        }
    })
   
    checks.forEach((check) =>{
        check.addEventListener("click",() =>{
            const bcheck=formcheckbox.querySelectorAll( "input[name='id']:checked").length
            if(bcheck ==checks.length){
                checkall.checked=true
            }
            else{
                checkall.checked=false
            }
        })
    })
   


}


const formMulti=document.querySelector("[form-change-multi]")
if(formMulti){
    formMulti.addEventListener("submit",(e) =>{
    
        e.preventDefault()
        const checkeds=formcheckbox.querySelectorAll( "input[name='id']:checked")
        const type=e.target.elements.type.value
        if(type =="delete-all"){
            const confirmDel=confirm("Bạn có chắc muốn xóa những bản ghi này?")
            if(!confirmDel){
                return
            }
        }
        if(checkeds.length>0){
        array=[]
        const inputIds = formMulti.querySelector("input[name='ids']")
        if(type =="change-position"){
    
            checkeds.forEach((button) =>{
                const position=button.closest("tr").querySelector("input[name='position']").value
    
    
                array.push(`${button.getAttribute("value")}-${position}`)
                
        
            })
        }
        else{
            checkeds.forEach((button) =>{
                array.push(button.getAttribute("value"))
                
        
            })
        }
        inputIds.value=array.join(", ")
        formMulti.submit()
    
       }
        
        
    
    })
}



const buttonsDelete=document.querySelectorAll("[button-category-delete]")
if(buttonsDelete.length>0){
    const formChange=document.querySelector("#form-delete-item")
    
    const path=formChange.getAttribute("data-path")
    buttonsDelete.forEach((button) =>{
        button.addEventListener("click",()=>{
            const confirmDelete = confirm("Bạn có chắc muốn xóa bản ghi này?")
            if(confirmDelete){
                const id=button.getAttribute("data-id")

                const action=path+`/${id}?_method=DELETE`
                formChange.action=action
    
                formChange.submit()
            }
           
            
        })
    })
}


const alert=document.querySelector("[show-alert]")
if(alert){
    const time=parseInt(alert.getAttribute("data-time"))
    
    const exit=alert.querySelector("[close-alert]")
    setTimeout(()=>{
        
    alert.classList.add("alert-hidden");
    },time)
    exit.addEventListener("click",()=>{
        alert.classList.add("alert-hidden");    
    })

}

const uploadFile=document.querySelector("[upload-image]")
if(uploadFile){
    const uploadinput=uploadFile.querySelector("[upload-image-input]")
    const uploadImagePreview=uploadFile.querySelector("[upload-image-preview]")
    uploadinput.addEventListener("change",(e) =>{
        if (e.target.files.length) {
            const image = URL.createObjectURL(e.target.files[0]);
      
            uploadImagePreview.src = image;
          }
    })

}



const sort=document.querySelector("[sort]")
if(sort){
    let url = new URL(window.location.href)
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    sortSelect.addEventListener("change",(e) =>{
        const value =e.target.value
        const [sortKey, sortValue] = value.split("-")
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;

    })

    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
    
        window.location.href = url.href;
      });

    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if(sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
    optionSelected.selected = true;





    }
}



const buttonsDeleteCategory=document.querySelectorAll("[button-category-delete]")

if(buttonsDeleteCategory.length>0){
    const formChange=document.querySelector("#form-delete-item")
    
    const path=formChange.getAttribute("data-path")
    buttonsDeleteCategory.forEach((button) =>{
        button.addEventListener("click",()=>{
            const confirmDelete = confirm("Bạn có chắc muốn xóa bản ghi này?")
            if(confirmDelete){
                const id=button.getAttribute("data-id")

                const action=path+`/${id}?_method=DELETE`
                formChange.action=action
    
                formChange.submit()
            }
           
            
        })
    })
}

const buttonsDeleteRoles=document.querySelectorAll("[button-role-delete]")

if(buttonsDeleteRoles.length>0){
    const formChange=document.querySelector("#form-delete-item")
    
    const path=formChange.getAttribute("data-path")
    buttonsDeleteRoles.forEach((button) =>{
        button.addEventListener("click",()=>{
            const confirmDelete = confirm("Bạn có chắc muốn xóa bản ghi này?")
            if(confirmDelete){
                const id=button.getAttribute("data-id")

                const action=path+`/${id}?_method=DELETE`
                formChange.action=action
    
                formChange.submit()
            }
           
            
        })
    })
}


const buttonAccountStatus = document.querySelectorAll("[button-account-status]")
if(buttonAccountStatus){
    const formChange=document.querySelector("#form-change-status")
    const path=formChange.getAttribute("data-path")
    buttonAccountStatus.forEach((button) =>{
        button.addEventListener("click",() =>{
            const status=button.getAttribute("data-status")
            const id=button.getAttribute("data-id")

            const statusChange=status=="active"?"inactive":"active"
            const action=path+`/${statusChange}/${id}?_method=PATCH`
            formChange.action=action

            formChange.submit()
        })
    })
}





