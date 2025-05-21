const quizContainer = document.querySelector('.quiz-container');
const questionSlides = document.querySelectorAll('.question-slide');
const resultContainer = document.getElementById('result-container'); 

const resultText = document.getElementById('result-text'); 
const resultImage = document.getElementById('result-image');


let currentQuestionIndex = 0; 
let categoryScores = { 
    A: 0,
    B: 0,
    C: 0
};


const results = {
    A: {
        text: "AAA!",
        image: "../img/s-01.png" 
    },
    B: {
        text: "BBB!",
        image: "../img/s-02.png" 
    },
    C: {
        text: "CCC",
        image: "../img/s-03.png" 
    },
    // 동점 등 특별한 경우를 위한 결과도 정의할 수 있습니다.
    // 예를 들어 A와 B가 동점일 때:
    // AB_Tie: {
    //     text: "당신은 A와 B의 성향을 모두 가진 개발자입니다!",
    //     image: "img/result_AB.png"
    // }
};
// -------------------------------------


const answerButtons = document.querySelectorAll('.answer-btn');
answerButtons.forEach(button => {
    button.addEventListener('click', function() {
      
        const selectedCategory = this.dataset.category;

        if (categoryScores.hasOwnProperty(selectedCategory)) {
            categoryScores[selectedCategory]++;
        } else {
            console.warn(`알 수 없는 카테고리: ${selectedCategory}. data-category 값을 확인하세요.`);
        }

        moveToNextQuestion();
    });
});


function displayQuestion(index) {

    questionSlides.forEach(slide => {
        slide.style.display = 'none';
    });

    
    if (index < questionSlides.length) {
        questionSlides[index].style.display = 'block'; 
    }
}


function moveToNextQuestion() {
    
    if (currentQuestionIndex < questionSlides.length) {
        questionSlides[currentQuestionIndex].style.display = 'none';
    }


    currentQuestionIndex++;

    
    if (currentQuestionIndex < questionSlides.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        
        showResult();
    }
}


function showResult() {
   
    quizContainer.style.display = 'none';

    resultContainer.style.display = 'block'

    let winningCategory = null;
    let maxScore = -1;
    let tie = false;

    for (const category in categoryScores) {
        if (categoryScores.hasOwnProperty(category)) {
            if (categoryScores[category] > maxScore) {
                maxScore = categoryScores[category];
                winningCategory = category;
                tie = false; 
            } else if (categoryScores[category] === maxScore && maxScore > 0) {
                
                tie = true;
                
            }
        }
    }
    
    const finalResult = results[winningCategory]; // 

    if (finalResult) {
        resultText.textContent = finalResult.text;
        resultImage.src = finalResult.image;
        resultImage.alt = finalResult.text;

    } else {
        
        resultText.textContent = "결과를 불러오는데 문제가 발생했습니다.";
        resultImage.style.display = 'none'; 
        console.error("최종 결과를 매핑할 카테고리를 찾지 못했습니다:", winningCategory, categoryScores);
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    displayQuestion(currentQuestionIndex);
});