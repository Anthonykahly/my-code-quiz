//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_actual = document.querySelector(".quiz_actual");
const options_li = document.querySelector(".options_li");
const timerCount = quiz_actual.querySelector(".timer .timer_sec");


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
    startTimer(10);
}

let q_count = 0 //Question count
let q_numb = 1 //Question number (1-5)
let counter;
let timeV = 10; //Setting time value
let useScore = 0;

//Next button call
const next_btn = quiz_actual.querySelector("footer .next_btn");
const results = document.querySelector(".results"); //Results
const restart_quiz = results.querySelector(".buttons .restart"); //Quiz restart function
const quit_quiz = results.querySelector(".buttons .quit"); //Quiz quit functioning



//Setting up the functioning on click settings for the next button
next_btn.onclick = () => {
    if (q_count < questions.length - 1) {
        q_count++; //Moving to the next question
        q_numb++; //Changing the question # count in the bottom of the footer
        showQuestions(q_count); //Question count
        qCounter(q_numb); //Question number
        clearInterval(counter); //On click of nextbutton resets timer
        startTimer(timeV); //Then starts a new timer for 10 seconds
    } else {
        console.log("All questions completed"); //Logs when the entire array of questions has been completed
        showResultBox();
    }
}

//getting questions and pulling options from the array
function showQuestions(index) {
    const q_text = document.querySelector(".q_text")
    //const options_li = document.querySelector(".options_li")//
    let q_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>' //pulling the first question which would be 0 in the array
    let options_tag = '<div class="options">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="options">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="options">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="options">' + questions[index].options[3] + '<span></span></div>'
    q_text.innerHTML = q_tag;
    options_li.innerHTML = options_tag;

    //multiple choice options for answers
    const options = options_li.querySelectorAll(".options");
    for (i = 0; i < options.length; i++) {
        options[i].setAttribute("onClick", "optionSelected(this)");
    }
}

//creating a tag for a green checkmark for correct answer visuals
let checkIconTag = '<div class="icon tick"><span>&#10003;</span></i></div>';
//creating a tag for a red X for incorrect answer visuals
let xIconTag = '<div class="icon cross"><span>&#x2717;</span></i></div>';

function optionSelected(answer) { //Setting up the function for user selecting quiz answers
    clearInterval(counter); //Stops the timer when an answer is selected
    let userAnswer = answer.textContent;
    let correctAnswer = questions[q_count].answer;
    let allOptions = options_li.children.length;
    console.log(userAnswer) //Logs the users input for answer
    if (userAnswer == correctAnswer) {
        useScore += 1;
        console.log(useScore); //logs users score for correct answers
        answer.classList.add("correct"); //Set the option to change to the ".options.correct" option defined in CSS
        console.log("Answer Correct"); //Simple console log of correct answer for tracking functionality might remove later
        answer.insertAdjacentHTML("beforeend", checkIconTag) //Inserts a green checkmark when user selection is correct answer
    } else {
        answer.classList.add("incorrect"); //Set the option to change to the ".options.incorrect" option defined in CSS
        console.log("Incorrect Answer"); //Simple console log of incorrect answer for tracking functionality might remove later
        answer.insertAdjacentHTML("beforeend", xIconTag) //Inserts an X on the incorrect option when selected

        //selects the correct answer if user chooses the wrong answer
        for (let i = 0; i < allOptions; i++) {
            if (options_li.children[i].textContent == correctAnswer) {
                options_li.children[i].setAttribute("class", "options correct")
                options_li.children[i].insertAdjacentHTML("beforeend", checkIconTag); //Puts a green check on the correct answer if user is incorrect
            }
        }
    }

    for (i = 0; i < allOptions; i++) {
        options_li.children[i].classList.add("disabled");  //Once user selects, disabling all options
    }
}

function showResultBox() {
    info_box.classList.remove("activeInfo"); //hides info box
    quiz_actual.classList.remove("activeQuiz"); //hides quiz box
    results.classList.add("activeResults"); //shows results box
    const scoreTxt = results.querySelector(".score_Txt");
    if (useScore > 0) {
        let scoreTag = '<span>You got <p>' + useScore + '</p>out of<p>' + questions.length + '</p> questions correct.</span>';
        scoreTxt.innerHTML = scoreTag;
    }
}


//starting timer function 10sec per question
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timerCount.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timerCount.textContent = "0";
        }
    }
}

function qCounter(index) {
    const bottom_q_counter = quiz_actual.querySelector(".total_q"); //Creating a span tag to counter question number and total questions
    let totalQCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_q_counter.innerHTML = totalQCountTag;
}

