
// add toggle class="active" to buttons if clicked
$(document).on("click", ".choice", function(event){
  event.preventDefault();
  var selectedOption = event.target.textContent.trim();
  if(selectedOption !== "add"){
    event.target.classList.toggle("active")
    if(qTypeArray.includes(selectedOption)){
      var indexNum = qTypeArray.indexOf(selectedOption)
        qTypeArray.splice(indexNum,1)
    }
    else {
      qTypeArray.push(selectedOption)
    }
  }
  console.log(qTypeArray);
});

$(document).on("click", ".start-btn", function(){
  playGame()
})

var qTypeArray = ["add"]
var question;
var answer;
var answerResult = []

// 4 types of calculations random
var qGenerator = function(){
  var firstNum = Math.floor(Math.random()*10)
  var secondNum = Math.floor(Math.random()*10)
  var randomToThree = Math.floor(Math.random()*qTypeArray.length)
  var calculation = qTypeArray[randomToThree]
  if(calculation === "add"){
    question = `${firstNum} + ${secondNum}`
    answer = firstNum + secondNum
  }
  else if(calculation === "subtract"){
    question = `${firstNum} - ${secondNum}`
    answer = firstNum - secondNum
  }
  else if(calculation === "devide") {
    question = `${firstNum} / ${secondNum}`
    answer = firstNum / secondNum
  }
  else {
    question = `${firstNum} * ${secondNum}`
    answer = firstNum * secondNum
  }
}


// basic gameplay function
var showQuestion = function(){
  if(counter > 0){
    qGenerator();
    var pop = question;
    $(".question p").html(pop)
  }
}

$(document).on("change", ".answer-box input", function(){
  if(counter > 0){
    var userAnswer = $(this).val();
    if(Number(userAnswer) === answer){
      $(".result-box span").text("Perfect!")
      counter++;
      answerResult.push(1)
      $(".timer h2").html(counter)
      }
    else {
      $(".result-box span").text("you got it wrong!")
      answerResult.push(0)
    }
    question = "";
    answer = "";
    $(this).val("");
    showQuestion();

  }
})


var startTime = 10;
var counter = startTime
// basic countdown function
var countDown = function(){
  var initialTime = new Date();
  var endTime = new Date(initialTime.getTime() +10*1000 )
  var timer = setInterval(function(){
    counter--;
    $(".timer h2").html(counter)
    initialTime = new Date();
    // if(endTime.getTime() <= initialTime.getTime()){
    //   clearInterval(timer);
    //   $(".timer h2").html("Game Over")
    // }
    if(counter <= 0){
      clearInterval(timer);
      $(".timer h2").html("Game Over")
      resultChecker();
      $(".start-btn p").text("play again?")
    }
  },1000)
}

var resultChecker = function(){
  var totalAnswers = answerResult.length
  var correctAnswers = answerResult.filter(val => val > 0).length
  var correctRatio = correctAnswers/totalAnswers*100
  var totalPoints = answerResult.reduce(function(total, val){
    return total + val
  },0)
  console.log(`you got ${correctRatio}% right, you got ${totalPoints}`);
  answerResult =[]
}

var playGame = function(){
  countDown();
  showQuestion();
  counter = 10;
}
