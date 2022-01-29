function fetchDogs(cbf, bool){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(obj => cbf(obj, bool));
}


function loadDogs(dogObj, filterBool){
    let dogBar = document.getElementById('dog-bar');
    dogBar.textContent = '';
    document.getElementById('dog-info').textContent = '';

    for(let dog in dogObj){

        if(filterBool === true && dogObj[dog]['isGoodDog'] == false){
            continue;
        }
        else{
            let dogSpan = document.createElement('span');
            dogSpan.textContent = dogObj[dog]['name'];
            dogBar.appendChild(dogSpan);
            
            dogSpan.addEventListener('click', function(){
        

            let dogSummary = document.getElementById('dog-info');
            dogSummary.textContent = '';

            let dogImg = document.createElement('img');
            dogImg.setAttribute('src', dogObj[dog]['image']);

            let h2 = document.createElement('h2');
            h2.textContent = dogObj[dog]['name']

            let dogBtn = document.createElement('button');
            dogBtn.innerHTML = 'Good Dog!';
            dogSummary.appendChild(dogImg);
            dogSummary.appendChild(h2);
            dogSummary.appendChild(dogBtn);
                    
            dogBtn.addEventListener('click', (e) => {
                e.preventDefault();

                if(dogBtn.innerHTML === 'Good Dog!'){
                    dogBtn.innerHTML = 'Bad Dog!';
                    updateIsGoodDog(dogObj[dog], false);
                }
                else{
                    dogBtn.innerHTML = 'Good Dog!';
                        updateIsGoodDog(dogObj[dog], true);
                }
            })

            });
        }
    }
}

function updateIsGoodDog(dogObj, bool){
    //console.log(dogObj.id);

    fetch(`http://localhost:3000/pups/${dogObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "aplication/json",
        },
        body: JSON.stringify({
            isGoodDog: bool,
        }),
    })
    .then(resp => resp.json())
    .then(obj => console.log(obj))
}

function filterGoodDogs(dogObj, bool){
    let filterBtn = document.getElementById('good-dog-filter');
    filterBtn.addEventListener('click', () => {
        if(filterBtn.textContent.includes("OFF")){
            filterBtn.textContent = 'Filter good dogs: ON';
            filterBool = true;
            fetchDogs(loadDogs, filterBool);
        }
        else{
            filterBtn.textContent = 'Filter good dogs: OFF';
            filterBool = false;
            fetchDogs(loadDogs, filterBool);
        }
    })
    
}


let filterBool = false;

document.addEventListener('DOMContentLoaded', function(){
    fetchDogs(loadDogs, filterBool);
    fetchDogs(filterGoodDogs, filterBool);
})