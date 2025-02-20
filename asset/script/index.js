/*humberger bottom*/

function showMenu() {
    var x = document.getElementById('hamburger').innerHTML;
    console.log(x);
    if (x == "-") {
      console.log("close");
      document.getElementById('hamburger').innerHTML = "&#8801;";
      document.getElementById('menu_vertikal').style.display = "none";
    } else {
      console.log("hamburger");
      document.getElementById('hamburger').innerHTML = "-";
      document.getElementById('menu_vertikal').style.display = "block";
    }
  }

/*animate slider*/
AOS.init(
    {
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99,

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 300,
    delay: 3,
    duration: 2000,
    easing: 'ease',
    once: false,
    mirror: false,
    anchorPlacement: 'top-bottom',

  });

/*back to top*/
// Get the button
let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 3000 || document.documentElement.scrollTop > 3000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//bmi//
var tinggi,berat,keterangan,bmi;
function hitung() {
	tinggi = parseFloat(document.getElementById("ipt_t").value);
	tinggi /= 100;
	berat = parseFloat(document.getElementById("ipt_b").value);
	bmi = berat / (tinggi * tinggi);

	if (bmi > 27) {
		keterangan = "Gemuk, Kelebihan berat badan tingkat berat";
	}else if ((bmi >= 25.1) & (bmi <= 27)){
		keterangan = "Gemuk, Kelebihan berat badan tingkat ringan";
	}else if ((bmi >= 18.5) & (bmi <= 25)){
		keterangan = "Normal";
	} else if ((bmi >= 17) & (bmi <= 18.4)){
		keterangan = "Kurus, Kekurangan berat badan tingkat ringan";
	}else {
		keterangan = "Kurus, Kekurangan berat badan tingkat berat";
	}
	document.getElementById('bmi').innerHTML = "Hasil perhitungan BMI : " + bmi.toFixed(1);
	document.getElementById('keterangan').innerHTML = keterangan;
}


//mental health//

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}


exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
}
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count);
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}


quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector(".botomm .next_btn");
const bottom_ques_counter = document.querySelector(".botomm .total_que");


next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count);
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}


function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>';
 
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
         
        console.log("Not Safe");
        
    }else{
        answer.classList.add("incorrect");
        console.log("Safe");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore < 3){ 
       
        let scoreTag = '<span>Kamu baik-baik saja.Tidak ada yang perlu dicemaskan, tetap semangat!!! </p></span>';
        scoreText.innerHTML = scoreTag; 
      
    }
    else if(userScore == 3){ 
        let scoreTag = '<span>Kamu mengalami Stress ringan, Istirahat dulu jangan menyerah!!</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore == 5 ){ 
        let scoreTag = '<span>Kamu mengalami Stess medium, Segara temui keluarga atau orang tersayang anda</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore == 6 ){ 
      let scoreTag = '<span>Kamu mengalami Stess medium, Segara temui keluarga atau orang tersayang anda</span>';
      scoreText.innerHTML = scoreTag;
  }
    else if(userScore == 6 && 7){
        let scoreTag = '<span>Kamu sedang tidak baik-baik saja lakukan meditasi dan lakukan hal yang menyenangkan </span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore >= 8){ 
        let scoreTag = '<span>Keadaan kamu benar-benar buruk, kamu memerlukan tenaga ahli psikologi</span>';
        scoreText.innerHTML = scoreTag;
    }
     
    
}

