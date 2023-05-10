form =document.getElementById('quiz')
form.onsubmit = function submitAnswers(e) {
  e.preventDefault()
    var total = 3;
    var score = 0;
    
    //Get user input
    var q1 = document.forms['quizForm']['ans'].value;
    var q2 = document.forms['quizForm']['ans1'].value;
    var q3 = document.forms['quizForm']['ans2'].value;
    
    // Validation  
    for(var i = 1; i <= total; i++) {
      if(eval('q' + i) === null || eval('q' + i) == '' ) {
        alert('Bạn chưa chọn đáp án câu ' + i);
        return false;
      }
    }
    
    
    for(var i = 1; i <= total; i++) {
      // Check answers
      if (eval('q' + i) == answers[i - 1]) {
        score++;
      }
    }

    alert('Điểm của bạn là ' + score + ' trên' + total);
  
    // Display results
    var results = document.getElementById('results');
    results.innerHTML = '<h3>Điểm của bạn là <span>' + score + '</span> trên <span>' + total + '</span></h3>';
    
    return false;
  }

  form.onreset = function(){
    var results = document.getElementById('results');
    results.innerHTML = '';
  }