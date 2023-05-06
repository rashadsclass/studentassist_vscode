// Function to add a new question to the quiz creation form
function addQuestion() 
{
	// Get form elements
	var questionInput = document.getElementById("question");
	var option1Input = document.getElementById("option1");
	var option2Input = document.getElementById("option2");
	var option3Input = document.getElementById("option3");
	var option4Input = document.getElementById("option4");
	var answerSelect = document.getElementById("answer");

	// Get form values
	var question = questionInput.value;
	var option1 = option1Input.value;
	var option2 = option2Input.value;
	var option3 = option3Input.value;
	var option4 = option4Input.value;
	var answer = answerSelect.value;

	// Create question element
	var questionElement = document.createElement("div");
	questionElement.innerHTML = "<h3>" + question + "</h3>";
	questionElement.innerHTML += "<input type='radio' name='" + question + "' value='" + option1 + "'>" + option1 + "<br>";
	questionElement.innerHTML += "<input type='radio' name='" + question + "' value='" + option2 + "'>" + option2 + "<br>";
	questionElement.innerHTML += "<input type='radio' name='" + question + "' value='" + option3 + "'>" + option3 + "<br>";
	questionElement.innerHTML += "<input type='radio' name='" + question + "' value='" + option4 + "'>" + option4 + "<br>";

	// Add question element to quiz creation form
	var quizQuestions = document.getElementById("quiz-questions");
	quizQuestions.appendChild(questionElement);

	// Reset form inputs
	questionInput.value = "";
	option1Input.value = "";
	option2Input.value = "";
    option3Input.value = "";
    option4Input.value = "";
    answerSelect.value = "option1";
}

// Function to submit the quiz
function submitQuiz() 
{
    // Get all question elements
	var questionElements = document.querySelectorAll("#quiz-questions div");

	// Create variable to store number of correct answers
	var numCorrect = 0;

	// Loop through each question element
	for (var i = 0; i < questionElements.length; i++) 
    {
		// Get question text and correct answer
		var questionText = questionElements[i].querySelector("h3").textContent;
		var correctAnswer = questionElements[i].querySelector("input[type='radio'][value='" + questionElements[i].querySelector("input[type='radio']:checked").value + "']").value;

		// Get user's answer
		var userAnswer = document.querySelector("input[type='radio'][name='" + questionText + "']:checked").value;

		// Check if user's answer is correct
		if (userAnswer === correctAnswer) 
        {
			numCorrect++;
		}
	}

	// Display results
	var quizResults = document.createElement("div");
	quizResults.innerHTML = "<h2>Quiz Results</h2>";
	quizResults.innerHTML += "<p>You got " + numCorrect + " out of " + questionElements.length + " questions correct.</p>";
	var quizQuestions = document.getElementById("quiz-questions");
	quizQuestions.parentNode.replaceChild(quizResults, quizQuestions);
}