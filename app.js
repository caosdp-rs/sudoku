const puzzleboard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
let submission = []

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 59)
    ) {
        inputElement.classList.add('odd-section')
    }
    puzzleboard.appendChild(inputElement)

}

const populateValues = (isSolvable, solution) => {
    isSolvable = (typeof isSolvable !== 'undefined') ? isSolvable : false;
    solution = (typeof solution !== 'undefined') ? solution : '008900400005600000300700609500004020000000065002001300000000000003008900070400200'

    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            if (solution[i] == 0) {} else {
                input.value = solution[i]
            }
        })
        solutionDisplay.innerHTML = 'Essa foi a resposta!'
    }else{
        solutionDisplay.innerHTML = 'Não foi encontrada nenhuma solução!'
    }
    
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    submission.push('{"input":[')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value)
        } else {
            submission.push('0')
        }
        submission.push(',')
    })
    submission.pop()
    submission.push(']}')
    //console.log(submission)
}
//data: '{"input":[0,0,8,9,0,0,4,0,0,0,0,5,6,0,0,0,0,0,3,0,0,7,0,0,6,0,9,5,0,0,0,0,4,0,2,0,0,0,0,0,0,0,0,6,5,0,0,2,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,8,9,0,0,0,7,0,4,0,0,2,0,0]}'
const solve = () => {
    joinValues()
    const data = {numbers: submission.join('')}
    //console.log('data', data)
    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data=> {
        console.log(data)
        populateValues(true,data.answer)
        submission=[]
    })
    .catch((error)=>{
        populateValues(false)
        console.log('Error:',error)
    })
}

solveButton.addEventListener('click', solve)