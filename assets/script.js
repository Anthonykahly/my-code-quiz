//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_actual = document.querySelector(".quiz_actual");


// setting terms for start button being clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show info box
}

// setting terms for exit button being clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
}
// setting terms for continue button being clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hides info box
    quiz_actual.classList.add("activeQuiz"); //shows quiz box
    showQuestions(0);
    qCounter(1);
}

let que_count = 0

const next_btn = quiz_actual.querySelector(".next_btn");

//When next button is selected
next_btn.onClick = ()=>{
    if (que_count > questions.length - 1){
        que_count++;
        showQuestions(que_count);
    }else{
        console.log("Questions.Completed");
    }
}

//getting questions and pulling options from the array
function showQuestions(index){
    const q_text = document.querySelector(".q_text")
    const options_li = document.querySelector(".options_li")
    let q_tag = '<span>'+ questions[index].numb+ ". " + questions[index].question +'</span>' //pulling the first question which would be 0 in the array
    let options_tag = '<div class="options">' + questions[index].options[0] +'<span></span></div>'
                    + '<div class="options">' + questions[index].options[1] +'<span></span></div>'
                    + '<div class="options">' + questions[index].options[2] +'<span></span></div>'
                    + '<div class="options">' + questions[index].options[3] +'<span></span></div>'
    q_text.innerHTML = q_tag;
    options_li.innerHTML = options_tag;
}

function qCounter(index){
    const bottom_q_counter = quiz_actual.querySelector(".total_q");
    let totalQCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_q_counter.innerHTML = totalQCountTag;
}

