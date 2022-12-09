//setting variables using querySelector
let input = document.querySelector('.input_text');
let button = document.querySelector('.submit');
let main = document.querySelector('#name');

let report = document.querySelector('.report');
let temp = document.querySelector('.temp');
let clouds = document.querySelector('.clouds');


//button that with onlick, runs the API function
button.addEventListener('click', function (name) {
    //api link and key
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=746fecc600cb1046f3147e3cbfd7a81b')
        //if successful, then...
        .then(response => response.json())
        .then(data => {
            //setting variables for data values
            let tempValue = data['main']['temp'];
            let nameValue = data['name'];
            let reportValue = data['weather'][0]['description'];

            //how it displays in the browser
            main.innerHTML = nameValue;
            report.innerHTML = "Report: " + reportValue;
            temp.innerHTML = "Temperature: " + tempValue;
            //resetting the input to blank string
            input.value = "";

        })

        //error if the city name is not a real city
        .catch(err => alert("Not a valid city name :("));
})