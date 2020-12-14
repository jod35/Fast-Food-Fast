const orderButton=document.querySelector('#order-btn');
const orderModal=document.querySelector('.order-modal');
const form=document.querySelector('form');
const orderCreateURL='/api/orders';
const notificationModal=document.querySelector('.noti-modal');
const notificationMessage=document.querySelector('.noti-text');
const table=document.querySelector('tbody');
const orderRecords=document.querySelectorAll('.order-record');
const OrderDeleteButtons=document.querySelectorAll('.btn-1');
const orderRecordIDs=document.querySelectorAll('.order-id');


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


            let row=document.createElement('tr');

            row.classList.add('order-record');

            

            let html=`
                <td class="order-id">${data.order.id}</td>
                <td>${data.order.order}</td>
                <td>${data.order.location}</td>
                <td>${data.order.date}</td>
                <td>${data.order.price}</td>
                <td><a href="#" class="btn-1">Delete</a></td>
                <td><a href="#" class="btn-2">Edit</a></td>
            `

            row.innerHTML=html;
            table.insertBefore(row,table.childNodes[0]);

            setTimeout(() => {
                location.reload;
            }, 2000);
        })

    console.log(newOrderObj);
    
    form.reset();

    e.preventDefault();
})

for(let i =0; i <orderRecords.length; i++){
        OrderDeleteButtons[i].addEventListener('click',()=>{
            let orderID=orderRecordIDs[i].innerText

            let DELETE_URL=`/api/order/${orderID}`

            fetch(
                DELETE_URL,
                {
                    method:"DELETE",
                }
            ).then(response=>response.json())
             .then((data)=>{
                 console.log(data.message);
                 notificationModal.style.display="block";
                 notificationMessage.innerText=data.message;
                 orderRecords[i].style.display="none";
             })
        })
}