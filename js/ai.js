

let keys = ""

fetch("/json/data.json")
.then(response => {
   return response.json();
})
.then(data => {
  datag = data;
  keys = Object.keys(datag)
});



showchat();

function add_function() {
  let try_time_for_checking_user_input_times = localStorage.getItem('try_time_for_checking_user_input_times');
  let questions_and_answers_object_containing_data = localStorage.getItem('questions_and_answers_object_containing_data');

  if (try_time_for_checking_user_input_times == null) {
    check = 1;
  } else {
    check = parseInt(try_time_for_checking_user_input_times);
  }

  if (questions_and_answers_object_containing_data == null) {
    questionlist = [];
  } else {
    questionlist = JSON.parse(questions_and_answers_object_containing_data);
  }
  if (check > 3) {
    
    let alertdiv = document.getElementById('alert-container').style.display = 'block';
    
    
  } else {

    let userinput = document.getElementById('chat-input');
    
   

    if (userinput.value == "") {
      confirm('pls Enter Text First');
    } else {

    
      k = 0
      while (keys[k]!=undefined) {
        if (keys[k].toLowerCase().includes(userinput.value.toLowerCase())) {
          // console.log(question[keys[k]]);
          if (userinput.value.toLowerCase() == "hello" || userinput.value.toLowerCase() == "hii"){
            answer = datag[keys[k]];
          }else{
          answer ="Sure i will Tell You About "+ userinput.value + "<br><br>"+ datag[keys[k]];}
          check += 1;
          localStorage.setItem('try_time_for_checking_user_input_times', check);
          break
        }else{
          answer = "Not Sure What You Are Talking About Can You Please Define More..."
        }
        k++;
      }



      let newobj = {
        "question_asked_by_user": userinput.value,
        "Answer_from_the_ai": answer
      }
      
      userinput.value = '';

      questionlist.push(newobj);
      localStorage.setItem('questions_and_answers_object_containing_data', JSON.stringify(questionlist));
      showchat();
    }
  }
}


function showchat(){
  let questions_and_answers_object_containing_data = localStorage.getItem('questions_and_answers_object_containing_data')
  if (questions_and_answers_object_containing_data == null) {
    questionlist = [];
  } else {
    questionlist = JSON.parse(questions_and_answers_object_containing_data);
  }
  
  userchat = '';
  
  questionlist.forEach(function(element,index){
    userchat += `   <div class="chat-user chat-user">
                <div class="chatuser-name chatbot-name">
                  USER
                </div>
                <p id="chatuser-out">${element.question_asked_by_user}</p>
              </div>
              
                            <div class="chat-bot" id="dis-none">
                <div class="chatbot-name">
                  SPACE AI
                </div>
                <p id="chatbot-out" class="typewriter chatbot-out">${element.Answer_from_the_ai}</p>
              </div>` 
  });
  
  let chatshowarea = document.getElementById('chat-showarea');
  
  if(questionlist.length != 0){
    chatshowarea.innerHTML = userchat;
  }
} 


function closealert(){
  
  document.getElementById('alert-container').style.display = 'none';
}

window.addEventListener('scroll', scrollper);


function scrollper(){
  htmlelement = document.documentElement;
  
  var scrollheight = htmlelement.scrollTop / htmlelement.clientHeight;
  
  
  htmlelement.style.setProperty("--scrollani",Math.min(scrollheight * 100,100));
}

scrollper();
