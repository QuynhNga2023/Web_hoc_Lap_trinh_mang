//Gọi các element
const start_btn = document.querySelector(".start_btn button"); //nút bắt đầu
const info_box = document.querySelector(".info_box"); //box quy định của bài kiểm tra
const exit_btn = info_box.querySelector(".buttons .quit"); //nút thoát
const continue_btn = info_box.querySelector(".buttons .restart"); //nút tiếp tục
const quiz_box = document.querySelector(".quiz_box"); //box câu hỏi
const result_box = document.querySelector(".result_box"); //box kết quả
const option_list = document.querySelector(".option_list"); //các lựa chọn
const time_line = document.querySelector("header .time_line"); //Thanh chạy thời gian
const timeText = document.querySelector(".timer .time_left_txt"); //Thời gian còn lại
const timeCount = document.querySelector(".timer .timer_sec"); //ô đếm thời gian
const head = document.querySelector('header')
// clicK vào nút bắt đầu: hiện box quy định bài kiểm tra
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}

// Click nút exit
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}

// Click nút tiếp theo
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //ẩn box mô tả
    quiz_box.classList.add("activeQuiz"); //hiện box câu hỏi
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

// click nút làm lại
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult"); 
    timeValue = 15; 
    que_count = 0;//số câu hỏi
    que_numb = 1;//câu hỏi số
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //dừng việc đếm giờ lại
    clearInterval(counterLine); //dừng thanh chạy thời gian
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Thời gian";
    next_btn.classList.remove("show"); //ẩn nút tiếp theo
}

//Click vào nút thoát: tải lại trang
quit_quiz.onclick = ()=>{
    window.location.reload();
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// click nút câu hỏi tiếp theo
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //câu hỏi không phải câu cuối
        que_count++; //tăng biến que_count: 
        que_numb++; //tăng biến que_numb: câu hỏi số
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Thời gian";
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); //calling showResult function
        next_btn.textContent = 'Xem kết quả'
    }
}

function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';//câu hỏi
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'//lựa chọn
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    // tạo thuộc tính onclick với tất cả các lựa chọn đáp án
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// Tạo các icon
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';//dấu V
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';// Dâu X

//Nếu người dùng chọn đáp án
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; //lấy giá trị đáp án người dùng click
    let correcAns = questions[que_count].answer; //câu trả lời đúng
    const allOptions = option_list.children.length; //Lấy giá trị tất cả các đáp án
    
    if(userAns == correcAns){ //Nếu người dùng chọn đáp án đúng
        userScore += 1; //tăng 1 điểm
        answer.classList.add("correct"); //Thêm màu xanh vào câu trả lời đúng
        answer.insertAdjacentHTML("beforeend", tickIconTag); //thêm tích xanh vào câu trả lời đúng
    }else{
        answer.classList.add("incorrect"); //thêm màu đỏ vào câu trả lời sai
        answer.insertAdjacentHTML("beforeend", crossIconTag); //Thêm dấu x vào câu trả lời sai

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //Nếu có 1 đáp án chính xác: hiện đáp án đó màu xanh và tick xanh
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
            }
        }
    }
    
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //Khi chọn đáp án thì không cho phép chọn các phương án còn lại
    }
    next_btn.classList.add("show"); //Hiện nút câu tiếp theo
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 8){ 
        let scoreTag = '<span>Chúc mừng! 🎉, Điểm của bạn là <p>'+ userScore +'</p> trên <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 5){ 
        let scoreTag = '<span>Tốt 😎, Điểm của bạn là <p>'+ userScore +'</p> trên <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>Rất tiếc 😐, Điểm của bạn là <p>'+ userScore +'</p> trên <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);//Gọi hàm time() mỗi 1 giây
    function timer(){
        timeCount.textContent = time; //Thay đổi giá trị trong phần đếm giờ bằng giá trị của time
        time--;
        if(time < 9){ //Thêm 1 số 0 vào trước giá trị nếu thời gian nhỏ hơn 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Hết giờ"; 
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct"); 
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            
        }
        next_btn.classList.add("show"); 
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > head.offsetWidth){
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    //Ghi câu số bao nhiêu ở footer
    let totalQueCounTag = '<span> Câu '+ index +'</p>trên<p>'+ questions.length +'</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}