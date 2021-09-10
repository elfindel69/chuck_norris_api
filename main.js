

const jokeHTML = document.querySelector("#joke");
const jokeIMG = document.querySelector("#jokeImg");
const btnRandomJoke = document.querySelector("#btnRandomJoke");
const btnFiveRandomJokes = document.querySelector("#btnFiveRandomJokes");
const divFiveJokes = document.querySelector("#fiveJokes");
const cat = document.querySelector("#cat")
const btnJokeByCat = document.querySelector("#btnJokeByCat")
const divListBtnCat = document.querySelector("#listBtnCat")

function getRandomJoke(cat=null) {

    let request = new XMLHttpRequest();
    let url ="https://api.chucknorris.io/jokes/random"
    if(cat) {
        url += `?category=${cat}`
    }
    request.open("GET", url);
    request.onload = reqListener;
    request.send();
}

cat.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("btnJokeByCat").click();
    }
});

function getFiveRandomJokes() {
    for (let i=0;i<5; i++){
        console.log(i)
        let request = new XMLHttpRequest();
        request.open("GET", "https://api.chucknorris.io/jokes/random");
        request.onload = reqListenerFiveJokes;
        request.send();
    }

}

btnRandomJoke.addEventListener("click", ()=>{getRandomJoke()})
btnJokeByCat.addEventListener("click", ()=>{
    console.log(cat.value)
    getRandomJoke(cat.value)})


function reqListener () {
    console.log(this.responseText);
    let jokeJS = JSON.parse(this.responseText)
    jokeHTML.textContent = jokeJS.value
     jokeIMG.src = jokeJS.icon_url
}

btnFiveRandomJokes.addEventListener("click",()=>
{

    getFiveRandomJokes()
})

function reqListenerFiveJokes () {
    divFiveJokes.innerHTML = "";
    let jokeJS = JSON.parse(this.responseText)
    console.log(jokeJS.value)
    divFiveJokes.innerHTML += `<h3>${jokeJS.value}</h3>`
    console.log(divFiveJokes)

}

function reqCategories(){
    let categories = JSON.parse(this.responseText)
    console.log(categories);
    categories.forEach(category =>{
        let btnCategory = document.createElement("button");
        btnCategory.classList.add("btn")
        btnCategory.classList.add("btn-success")
        btnCategory.textContent = category;
        btnCategory.addEventListener("click",()=>{
            getRandomJoke(category)
        })
        divListBtnCat.appendChild(btnCategory)
    })
}

{
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.chucknorris.io/jokes/categories");
    request.onload = reqCategories;
    request.send();
}

