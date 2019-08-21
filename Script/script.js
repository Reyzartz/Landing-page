//Getting DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('UserFocus');
function showTime(){  
//Getting Time
    let today = new Date(),
        hour=today.getHours(),
        mins=today.getMinutes(),
        AmPm =hour>12?'PM':'AM';
//Changing Greeting        
        getGreetings(hour);
//Setting time in 12 hour Foronat
        hour = hour>12 ? hour-12: hour==0?12:hour;
        mins=mins<10 ? `0${mins}`:mins;
        time.innerHTML =`${hour}:${mins}<span id="AmPm">${AmPm}</span>`;

        setTimeout(showTime,1000);
}
function getGreetings(hour){
//Defing Greetings Changing Background
    let greet="night";
if(hour>=5 && hour<12)
    greet='morning';
else if(hour>=12 && hour<17)
    greet='afternoon';
else if(hour>=17 && hour<20)
    greet='evening';
else if(hour>=20 && hour<5)
    greet='night';
    greeting.innerHTML=`good ${greet} `;
    document.body.style.backgroundImage=`url(./images/${greet}.jpg)`
}
//Getting User Name from Local Storage
function getName(){
    let UserName=null;
    if(localStorage.getItem('name')===null)
        UserName="[enter name]";
    else{
        UserName=localStorage.getItem('name')
    }
    name.innerHTML=`${UserName}`;
}
//Getting Focus from Local Storage
function getFocus(){
    let UserFocus=null;
    if(localStorage.getItem('UserFocus')===null)
        UserFocus="[Enter Focus]";
    else
        UserFocus=localStorage.getItem('UserFocus');
    focus.innerHTML=`${UserFocus}`;
}
//Storing data from user
function setType(e){
    if(e.type==="keypress"){
        if(e.keyCode ==13){
        localStorage.setItem(`${e.target.id}`,e.target.innerText);
        name.blur();
        focus.blur();
        }
    }
    else if(e.type==="blur"){
        localStorage.setItem(`${e.target.id}`,e.target.innerText);
    }
}
function input(type){
    type.innerText=null;
    type.addEventListener("keypress",setType);
}
showTime();
getName();
getFocus();
getWheatherData();