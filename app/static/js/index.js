const signUpmodal=document.querySelector('.signup-modal');
const signUpButton=document.querySelector('#signup-btn');
const closeButton=document.querySelector('#close-btn');
const loginModel=document.querySelector('.login-modal');
const loginButton=document.querySelector('#loginform-btn');
const loginToggleButton=document.querySelector('#login-btn');
const signUpToggleButton=document.querySelector('#signup-tbtn');
const loadSpinner=document.querySelector('.loading');
const signUpMessageSection=document.querySelector('.messages-error');
const loginformMessageSection=document.querySelector('.messages-success');





signUpButton.addEventListener('click',function(){
    signUpmodal.style.display ="block";
});


function closeModal(id){
    let el=document.getElementById(id);

    el.style.display="none"
    signUpMessageSection.style.display="none";
}

loginButton.addEventListener('click',function(){
    loginModel.style.display ="block";
});

loginToggleButton.addEventListener('click',function(){
    signUpmodal.style.display="none";
    loginModel.style.display="block";
})

signUpToggleButton.addEventListener('click',function(){
    signUpmodal.style.display="block";
    loginModel.style.display="none";
})




const forms=document.querySelectorAll('form');



let signUpForm=forms[0];


const API_URL='/auth/signup'

signUpForm.addEventListener('submit',(e)=>{
    let form_data=new FormData(signUpForm);
    signUpForm.reset()
    

    let newUserObj={
        username:form_data.get('username'),
        email:form_data.get('email'),
        password:form_data.get('password'),
        confirm:form_data.get('confirm')

    }
    console.log(newUserObj);

    signUpForm.style.display="none";
    loadSpinner.style.display="block";


    fetch(
        API_URL,
        {
            method:"POST",
            body:JSON.stringify(newUserObj),
            headers:{
                'content-type':'application/json'
            }
        }
    )
    .then(response=>response.json())
    .then((data)=>{
        if(data.success){
            console.log(data);

            setTimeout(() => {
                loadSpinner.style.display="none";
                signUpForm.style.display="block";
                signUpmodal.style.display="none";
                loginModel.style.display="block";
                loginformMessageSection.style.display="block";
                loginformMessageSection.innerText=data.message;
                
            }, 3000);
        }
        else{
            setTimeout(() => {
                console.log(data);

                signUpMessageSection.style.display="block";
                signUpMessageSection.innerText=data.message;
                loadSpinner.style.display="none";
                signUpForm.style.display="block";
                signUpmodal.style.display="block";


            }, 3000);

        }

        
    })

    e.preventDefault();
})
    
 

   



