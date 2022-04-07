const puzzleboard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay  = document.querySelector('#solution')
const squares = 81
const submission = []

for (let i=0; i< squares;i++){
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type','number')
    inputElement.setAttribute('min',1)
    inputElement.setAttribute('max',9)
    if (
        ((i % 9 ==0 || i % 9 ==1|| i % 9 ==2 ) && i < 21) ||
        ((i % 9 ==6 || i % 9 ==7|| i % 9 ==8 ) && i < 27) ||
        ((i % 9 ==3 || i % 9 ==4|| i % 9 ==5 ) && (i > 27 && i <53)) || 
        ((i % 9 ==0 || i % 9 ==1|| i % 9 ==2 ) && i > 53) ||
        ((i % 9 ==6 || i % 9 ==7|| i % 9 ==8 ) && i > 59) 
    ){
        inputElement.classList.add('odd-section')
    }
    puzzleboard.appendChild(inputElement)
    
}

const populateValues = () =>{
    solution = '008900400005600000300700609500004020000000065002001300000000000003008900070400200'
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input,i) => {
        if(solution[i]==0){}else{
        input.value = solution[i]
        }
    })
}

const joinValues = () =>{
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value){
            submission.push(input.value)
        }else{
            submission.push('.')
        }
        
    })
    console.log(submission)
}

const solve = () =>{
    const options = {
      method: 'POST',
      url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com',
        'X-RapidAPI-Key': '48885ca8d1msh293c4d5223c52efp1d3d74jsn7be1ae56334'
      },
      data: '{"input":[0,0,8,9,0,0,4,0,0,0,0,5,6,0,0,0,0,0,3,0,0,7,0,0,6,0,9,5,0,0,0,0,4,0,2,0,0,0,0,0,0,0,0,6,5,0,0,2,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,8,9,0,0,0,7,0,4,0,0,2,0,0]}'
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

solveButton.addEventListener('click',solve)
