document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.selectable-button').forEach(button => {
        button.addEventListener('click', function() {
            // toastr.success('Success messages');
            this.classList.toggle('selected');
        });
    });

    document.querySelector('#button-submit-register').addEventListener('click', function(event){
        handleSubmitRegister(event);
    })
    document.querySelector('#submit-interset-topic-form').addEventListener('click', function(event){
        handleSubmitTopic(event);
    })
    document.querySelector('#confirm-button').addEventListener('click', function(event){
       alert('✅ Success');
       toastr.success('Success');
    })
});
const loadSummaryData= ()=>{
   const nameElment =  document.getElementById('name-summary');
   const emailElment = document.getElementById('email-summary');
   const topicSummary = document.getElementById('topic-summary');
   const registerData = localStorage.getItem('register-data');
   const topicStore = localStorage.getItem('intersed-topic')
   const {name, email} = JSON.parse(registerData);
   const topics = JSON.parse(topicStore);
   nameElment.innerHTML = name; 
   emailElment.innerHTML = email;
   topics.forEach((topic) => {
      let childTopicList = document.createElement('li')
      childTopicList.innerHTML = topic;
      topicSummary.appendChild(childTopicList);
   })

}
function handleSubmitTopic(event) {
   
    event.preventDefault();
    const selectedButtons = document.querySelectorAll('.selectable-button.selected');
    if(selectedButtons.length ===0){
        toastr.error('please, select your intersest topic.');
    }else if(selectedButtons.length >0){
        const selectedValues = Array.from(selectedButtons).map(button => button.getAttribute('data-value'));
        document.getElementById('selectedTopics').value = selectedValues.join(',');
        console.log('Form submitted with selected topics:', selectedValues);
        localStorage.setItem('intersed-topic',JSON.stringify(selectedValues));
        changeFormContent("interset-topic-form","Summary-form" );
        loadSummaryData();
    }
  
    // You can submit the form data to your server here
    // document.getElementById('myForm').submit(); // Uncomment to submit form
}
function validateEmail(email) {
    let res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return res.test(email);
}
const validateRegisterForm =(data)=>{

    let error_message_name = document.getElementById('error-name');
    let error_message_email = document.getElementById('error-email');
    error_message_name.innerHTML ="";
    error_message_email.innerHTML="";
    // check form data validation
    if(data.get('name').length ===0){
        toastr.error('your name required');
        error_message_name.innerHTML ="your name required";
        return false;
    }
    else if(data.get('name').length<=3){
        toastr.error('please your name must be greater than 3 character.');
        error_message_name.innerHTML ="please your name must be greater than 3 character.";
        return false;
    }else if(data.get('email').length ===0){
        toastr.error('your email required.');
        error_message_email.innerHTML ="your email required.";
        return false;
    }
    else if(!validateEmail(data.get('email'))){
        toastr.error('your email not valid.');
        error_message_email.innerHTML ="your email not valid.";
        return false;
    }else{
        return true;
    }

}
const changeFormContent= (form_id_prev, form_id_next)=>{
    let form_id_prev_EL = document.getElementById(form_id_prev);
    form_id_prev_EL.style.display='none';
    let form_id_next_EL = document.getElementById(form_id_next);
    form_id_next_EL.style.display='grid';
}
function handleSubmitRegister(event) {
   
    event.preventDefault();
    let form = document.getElementById('Register-form-submit');
  
    // Get all field data from the form
    // returns a FormData object
    let data = new FormData(form);
    if( validateRegisterForm(data)){
        localStorage.setItem('register-data', JSON.stringify({
            name: data.get('name'),
            email:data.get('email')
        }));
        changeFormContent('Register-form','interset-topic-form');
    }

    for (let entry of data) {
        console.log(entry);
    }
}