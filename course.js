class Course 
{
  constructor(name) 
  {
    this.id = Date.now();
    this.name = name;
    this.flashcards = [];
  }

  addFlashcard(flashcard) 
  {
    this.flashcards.push(flashcard);
    saveCourseToLocalStorage(this);
  }

  removeFlashcard(flashcard)
  {
    const index = this.flashcards.indexOf(flashcard);
    if (index !== -1) 
    {
      this.flashcards.splice(index, 1);
      saveCourseToLocalStorage(this);
    }
  }

  getFlashcards() 
  {
    return this.flashcards;
  }
}

class Flashcard 
{
  constructor(question, answer) 
  {
    this.question = question;
    this.answer = answer;
  }

  getQuestion() 
  {
    return this.question;
  }

  getAnswer() 
  {
    return this.answer;
  }
}

function createCourse() 
{
  const courseNameInput = document.getElementById('courseNameInput');
  const courseName = courseNameInput.value.trim();
  if (courseName === '') 
  {
    alert('Please enter a course name');
    return;
  }

  const course = new Course(courseName);

  saveCourseToLocalStorage(course);
  courseNameInput.value = '';
  displayCourses();
}

function addFlashcard() 
{
  const questionInput = document.getElementById('questionInput');
  const answerInput = document.getElementById('answerInput');
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();
  if (!question || !answer) 
  {
    return;
  }
  const flashcard = new Flashcard(question, answer);
  const courseId = getCurrentCourseId();
  const course = getCourseFromLocalStorage(courseId);
  course.addFlashcard(flashcard);
  questionInput.value = '';
  answerInput.value = '';
  displayFlashcards(course);
}

function removeFlashcard(flashcard) 
{
  const courseId = getCurrentCourseId();
  const course = getCourseFromLocalStorage(courseId);
  course.removeFlashcard(flashcard);
  displayFlashcards(course);
}

function displayCourses() 
{
  const courseList = document.getElementById('courseList');
  courseList.innerHTML = '';
  const courses = getCoursesFromLocalStorage();
  courses.forEach(course => 
    {
        const courseItem = document.createElement('div');
        const courseLink = document.createElement('a');
        courseLink.href = '#';
        courseLink.textContent = course.name;
        courseLink.onclick = function() 
        {
          displayFlashcards(course);
          return false;
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() 
        {
            deleteCourse(course);
            displayCourses();
        };
        courseItem.appendChild(courseLink);
        courseItem.appendChild(deleteButton);
        courseList.appendChild(courseItem);
    });
}

function displayFlashcards(course) 
{
    coursePrime = new Course(course.id, course.name, course.flashcards); 
    setCurrentCourseId(course.id);
    const flashcardSection = document.getElementById('flashcardSection');
    const flashcardList = document.getElementById('flashcardList');
    flashcardList.innerHTML = '';
    coursePrime.getFlashcards().forEach(flashcard => 
        {
            const flashcardItem = document.createElement('li');
            const question = document.createElement('div');
            question.textContent = flashcard.getQuestion();
            const answer = document.createElement('div');
            answer.textContent = flashcard.getAnswer();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() 
            {
                removeFlashcard(flashcard);
            };
        flashcardItem.appendChild(question);
        flashcardItem.appendChild(answer);
        flashcardItem.appendChild(deleteButton);
        flashcardList.appendChild(flashcardItem);
        });
    flashcardSection.style.display = 'block';
}

function saveCourseToLocalStorage(course) 
{
    const courses = getCoursesFromLocalStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}

function deleteCourse(course) 
{
    const courses = getCoursesFromLocalStorage();
    const index = courses.findIndex(c => c.id === course.id);
    if (index !== -1) 
    {
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
    }
}

function getCourseFromLocalStorage(courseId) 
{
  const courses = getCoursesFromLocalStorage();
  console.log(courses);
  console.log(courseId); 
  const plainCourse = courses.find(c => c.id === courseId); 
  const course = new Course(plainCourse.name);
  course.id = plainCourse.id;
  course.flashcards = plainCourse.flashcards.map(f => new Flashcard(f.question, f.answer));
  return course;
}

function getCoursesFromLocalStorage() 
{
    const coursesString = localStorage.getItem('courses');
    return JSON.parse(coursesString) || [];
}

function setCurrentCourseId(courseId) 
{
    sessionStorage.setItem('currentCourseId', courseId);
}

function getCurrentCourseId() 
{
    return sessionStorage.getItem('currentCourseId');
}

displayCourses();