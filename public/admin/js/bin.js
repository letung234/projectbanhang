//bin
const trash=document.querySelector("[trash-bin]")
if(trash){
    const form=document.querySelector("#form-restore-item")
    const p=form.getAttribute("data-path")

    
    const button=trash.querySelectorAll("[button-restore]")
    button.forEach((b) =>{
        b.addEventListener("click",()=>{
            const id=b.getAttribute("data-id")
            const path=`${p}/${id}?_method=PATCH`
            form.action=path
            form.submit()

        })
    })
    
}





//end bin