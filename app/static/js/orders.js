const orderButton=document.querySelector('#order-btn');
const orderModal=document.querySelector('.order-modal');
const form=document.querySelector('form');
const orderCreateURL='/api/orders';
const notificationModal=document.querySelector('.noti-modal');
const notificationMessage=document.querySelector('.noti-text');
const table=document.querySelector('tbody');


orderButton.addEventListener('click',function(){
    orderModal.style.display="block";
})


function closeModal(id){

    var el =document.getElementById(id);
    
    el.style.display="none";
}


form.addEventListener('submit',(e)=>{
    form_data=new FormData(form);
    let newOrderObj={
        location:form_data.get('location'),
        price:form_data.get('price'),
        comment:form_data.get('comment'),
        order:form_data.get('order')
    }

    fetch(orderCreateURL,
            {   method:"POST",
                body:JSON.stringify(newOrderObj),
                headers:{
                    'content-type':'application/json'
                }
            }
        
        )
        .then(response => response.json())

        .then((data)=>{
            console.log(data);
            orderModal.style.display="none";
            notificationModal.style.display="block";
            notificationMessage.innerText=data.message;

            let html=`
            
            <tr>
                <td>${data.order.id}</td>
                <td>${data.order.order}</td>
                <td>${data.order.location}</td>
                <td>${data.order.comment}</td>
                <td>${data.order.date}</td>
                <td>${data.order.price}</td>
            </tr>
            
            
            `
            table.innerHTML +=html;
        })

    console.log(newOrderObj);
    
    form.reset();

    e.preventDefault();
})