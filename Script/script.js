//Getting DOM Elements
const API_Key="563492ad6f917000010000017ceed48c9a2b4cad83b35a79a9fde899";
let time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('UserFocus'),
    headers={
        Authorization: API_Key
    },
    greet="night",
    cat=["abstarct","abstract","abstract","sunset","space","universe","galaxy","clouds","forest","mountains","rain","city","night","seas","architecture"],
    bckURl="";
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
if(hour>=5 && hour<12)
    greet='morning';
else if(hour>=12 && hour<17)
    greet='afternoon';
else if(hour>=17 && hour<20)
    greet='evening';
else if(hour>=20 && hour<5)
    greet='night';
    greeting.innerHTML=`good ${greet} `;
}
//Getting User Name from Local Storage
function getName(){
    let UserName=null;
    if(localStorage.getItem('name')===null)
        UserName="[enter search]";
    else{
        UserName=localStorage.getItem('name')
    }
    name.innerHTML=`${UserName}`;
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

const fetch_url=(search)=>{
   let url=`https://api.pexels.com/v1/search?query=landscape+${search}+query&per_page=20&page=1`
    fetch(url,{
        headers,
        mode:"cors",
        method:"GET"
    })
    .then(resp=>resp.json())
    .then(data=>{
        url = `${data.photos[Math.floor(Math.random()*10)].src.original}?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920`
        console.log(data);
        document.body.style.backgroundImage=`url(${url})`
        }
    )
}


const init=async ()=>{
    showTime();
    let ser = cat[Math.floor(Math.random()*cat.length)]
    await fetch_url(ser)
    console.log(ser);
    
    getName();
}
init()