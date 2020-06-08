// global arrays
var qTypeArray = ["add"]
var question;
var answer;
var answerResult = []
var highScore;
var startTime = 10;
var counter = startTime

// displaying the current num-range value to user
var numRangeValue =  document.getElementById("math-range").valueAsNumber
$(".range-show").html(numRangeValue)

// changing the num-range when user changes the slider value
  $(document).on("input", "#math-range", function(){
    var newValueText = $(this).val()
    var newValueNum = Number(newValueText)
    numRangeValue = newValueNum
    $(".range-show").html(newValueNum)
  })

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

// game start button
$(document).on("click", ".start-btn", function(){
  playGame()
})

// 4 types of calculations random
var qGenerator = function(){
  var firstNum = Math.floor(Math.random()*(numRangeValue)+1)
  var secondNum = Math.floor(Math.random()*(numRangeValue)+1)
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
  else if(calculation === "divide") {
    question = `${firstNum * secondNum} / ${secondNum}`
    answer = Math.round((firstNum * secondNum)/ secondNum)
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
$(".answer-box input").onkeydown
// user answer checking function
$(document).on("keydown", ".answer-box input", function(event){
  if(event.keyCode === 13){
    if(counter > 0){
      var userAnswer = $(this).val();
      if(Number(userAnswer) === answer){
        $(".result-box span").text("Perfect!")
        counter++;
        $(".timer h2").html(counter);
          if(question.includes("-")){
            answerResult.push(1.2 * numRangeValue)
          }
          else if(question.includes("*")){
            answerResult.push(1.4 * numRangeValue)
          }
          else if(question.includes("/")){
            answerResult.push(1.4 * numRangeValue)
          }
          else {
            answerResult.push(1 * 10)
          }
          var currentScore = answerResult.reduce(function(total, val){
              return total + val
            },0)
            $(".show-number:eq(1)").text(`${currentScore}`)
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
  }
})


// basic countdown function
var countDown = function(){
  var timer = setInterval(function(){
    counter--;
    $(".timer").html(`<h2 class="mb-0" >${counter}</h2>`)
    if(counter <= 0){
      clearInterval(timer);
      $(".timer").html(`<p class="mb-0" >Game Over</p>`)
      resultChecker();
      $(".start-btn p").text("play again?")
    }
  },1000)
}
// checking the result of the game and displaying.
var resultChecker = function(){
  var totalAnswers = answerResult.length
  var correctAnswers = answerResult.filter(val => val > 0).length
  var correctRatio = Math.round(correctAnswers/totalAnswers*100) || 0
  var totalPoints = answerResult.reduce(function(total, val){
    return total + val
  },0)
  console.log(totalAnswers,correctAnswers,correctRatio,totalPoints);
  if(highScore < totalPoints || highScore === undefined){
    highScore = totalPoints
  }
    $(".show-number").first().text(highScore)
    $(".show-number:eq(2)").text(`${totalAnswers}`)
    $(".show-number").last().text(`${correctRatio}`)
  answerResult =[]
}

// basic flow of the game, 1.reset the counter, update the question, start the counter
var playGame = function(){
  counter = 10;
  showQuestion();
  countDown();
}

$(document).on("load", function(){
  showQuestion();
})
