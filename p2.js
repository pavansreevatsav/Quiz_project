function QuizItem(question, variants, answer, enabled, replied, selectionOfUser) {
	this.question = question;
	this.variants = variants;
	this.answer = answer;
	this.enabled = enabled;
	this.replied = replied;
	this.selectionOfUser = selectionOfUser;
}

var quizQuestions = [];
quizQuestions[0] = new QuizItem("What is the Capital of India:", 
						["Hyderabad","MadhyaPradesh","Delhi", "Goa"], 
						 2,
						 false,
						 false,
						 undefined);

quizQuestions[1] = new QuizItem("Who is CM of AndraPradesh", 
						["KCR", "Lokesh","ChandraBabu","Jagan"],
						 2,
						 false,
						 false,
						 undefined);

quizQuestions[2] = new QuizItem("Which of the following are backend webdevelopment",
						["HTML","NODEJS", "JAVASCRIPT","CSS"],
						 1,
						 false,
						 false,
						undefined);

quizQuestions[3] = new QuizItem("Which of the following are not MEAN stack Technologies",
						["MONGODB","SQL","EXPRESS","NODEJS"],
						1,
						false,
						false,
						undefined);

quizQuestions[4] = new QuizItem("Which keyword is used to declare variables in javascript?",
						["var","dim","string","int"],
						0,
						false,
						false,
						undefined);
var currentIndex = 0, numOfAnswered = 0;
var currentQuestion = quizQuestions[currentIndex];
var ulTag = document.getElementsByTagName('ul')[1];
var liTags = ulTag.getElementsByTagName('li');
var score1=document.querySelector("#score1");
var scorevalue=0;

function showCurrentQuestion() {
	var headerOfDropdow = document.getElementsByClassName('wrapper')[0];
	var numQuestion = parseInt(currentIndex)+1;
	headerOfDropdow.getElementsByTagName('span')[0].innerHTML = numQuestion;
	var pTag = document.getElementsByTagName('p')[0];
	var ulTag = document.getElementsByTagName('ul')[1];
	var liTags = ulTag.getElementsByTagName('li');
	pTag.innerHTML = currentQuestion.question;
	for (var i=0; i < liTags.length; i++) {
		if (currentQuestion.variants[i] == undefined) {
			console.log(currentQuestion.variants[i]);
			liTags[i].className = "doNotDisplay";
		} else {
			console.log(currentQuestion.variants[i]);
			liTags[i].innerHTML = currentQuestion.variants[i];
			liTags[i].className = "";
		}
	}
};

enableLiOnClickEvents();
showCurrentQuestion();

function changeLiStyle() {
	var selectedItem = document.getElementsByClassName('selected')[0];
	if (selectedItem) selectedItem.className = "";
	this.className = "selected";
}


function enableLiOnClickEvents() {
	for (var i=0; i < liTags.length; i++) {
		console.log(liTags[i]);
		liTags[i].onclick = changeLiStyle;
	}
};

var button = document.getElementsByClassName('submit')[0];
button.onclick = submitAndCheckAnswer;

function submitAndCheckAnswer() {
	var selectedItem = document.getElementsByClassName('selected')[0];

 if (selectedItem == undefined)
   		alert("There is no variant selected! Please select any!");
else {
   currentQuestion.enabled = true;
	if (selectedItem.innerHTML == currentQuestion.variants[currentQuestion.answer]) {
		
		console.log("Correct "+ currentQuestion.variants.indexOf(selectedItem.innerHTML));
		changeTheLayoutAccordingTheResult(selectedItem,"correct", true);
		checkIfTheLastQuestion(this);
		numOfAnswered++;
		scorevalue=scorevalue+100;
		score1.textContent=scorevalue;

		
	} else {
		
		console.log("Wrong!");
		changeTheLayoutAccordingTheResult(selectedItem,"wrong", false);
		checkIfTheLastQuestion(this);
		scorevalue=scorevalue-25;
		score1.textContent=scorevalue;
		liTags[currentQuestion.answer].className = "correct";
	}	
}
}

function changeTheLayoutAccordingTheResult(selectedItem,result,replied) {
	console.log(result);

	currentQuestion.selectionOfUser = currentQuestion.variants.indexOf(selectedItem.innerHTML);
	selectedItem.className=result;
	disableLiOnClickEvents();
}

function checkIfTheLastQuestion(button) {
	console.log("currentIndex: ",currentIndex);
	if (currentIndex == quizQuestions.length-1) {
			console.log(currentIndex +" " + quizQuestions.length);
			button.className = "finalize";
			button.innerHTML = "Finalize";
			button.onclick = finalize;
		} else {
			console.log(currentIndex +"fdsf " + quizQuestions.length);
			currentIndex++;
			button.innerHTML = "Next Question";
			button.className = "next";
			button.onclick = goToNextQuestion;
		}
}

function disableLiOnClickEvents() {
	for (var i=0; i < liTags.length; i++) {
		liTags[i].onclick = "";
	}
}

function goToNextQuestion() {

	currentQuestion = quizQuestions[currentIndex];

	this.innerHTML = "Submit";
	this.onclick = submitAndCheckAnswer;
	this.className = "submit";
	showCurrentQuestion();
	enableLiOnClickEvents();
}

function cleanUpTheLayout() {
	var mainDiv = document.getElementsByClassName('main')[0];

	while (mainDiv.hasChildNodes()) {
		mainDiv.removeChild(mainDiv.firstChild);
	}
	console.log("clean UPP!!");
}

function createQuestionLayout() {
			var mainDiv = document.getElementsByClassName('main')[0];
			var wrapperDiv = document.createElement('div');
			wrapperDiv.className = "wrapper";
			wrapperDiv.onclick = "showDropdown";
			mainDiv.appendChild(wrapperDiv);
			for (var j = 0 ; j < 2; j++) {
				var span = document.createElement('span');
				wrapperDiv.appendChild(span);
			}
			span.innerHTML = "/ "+quizQuestions.length;
			var ulDdown = document.createElement('ul');
			ulDdown.className = "dropdown";
			mainDiv.appendChild(ulDdown);
			var pTag = document.createElement('p');
			pTag.className = "question";
			var ulTag = document.createElement('ul');
			mainDiv.appendChild(pTag);
			mainDiv.appendChild(ulTag);
			for (var i = 0 ; i < 4; i++) {
				var liTag = document.createElement('li');
				ulTag.appendChild(liTag);
				var liTag1 = document.createElement('li');
				ulDdown.appendChild(liTag1);
			}
			var button = document.createElement('button');
			button.innerHTML = "Back";
			button.className = "back";

			button.onclick = finalize;
			mainDiv.appendChild(button);
}

function returnToQuestion() {
	console.log(this);
	var questionTitle = this.getElementsByClassName("questionCol")[0].innerHTML;
	var questionNum = questionTitle[questionTitle.length -1];
	
 
 			cleanUpTheLayout();
			createQuestionLayout();
			currentQuestion = quizQuestions[questionNum -1];

			currentIndex = questionNum-1;
			showCurrentQuestion();
			var correctLiNum = quizQuestions[questionNum-1].answer;
  if (quizQuestions[questionNum-1].enabled) {
	 	if (quizQuestions[questionNum-1].replied) {
	 		
			document.getElementsByTagName("li")[correctLiNum+4].className="correct";
		} else {
			var selectedLiNum = quizQuestions[questionNum-1].selectionOfUser;
			document.getElementsByTagName("li")[selectedLiNum+4].className="wrong";
			document.getElementsByTagName("li")[correctLiNum+4].className="correct";
		
	 }
}
}
