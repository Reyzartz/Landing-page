//Getting DOM Elements
const API_Key="563492ad6f917000010000017ceed48c9a2b4cad83b35a79a9fde899";
current_image_url="";
let img_tag=document.getElementById('save-image');
let time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    weather = document.getElementById('weather'),
    focus = document.getElementById('UserFocus'),
    headers={
        Authorization: API_Key
    },
    currentOptions = localStorage.getItem('LandingPageOptions')===""  || localStorage.getItem('LandingPageOptions')===null? 
                    [] : localStorage.getItem('LandingPageOptions').split(','),
    bckURl="",
    img_size=null
    open_option_state=false;
    pos={
        lat:null,
        lon:null
    }
    

function showTime(){  
//Getting Time
    let today = new Date(),
        hour=today.getHours(),
        mins=today.getMinutes(),
        AmPm =hour>12?'PM':'AM';
//Setting time in 12 hour Foronat
        hour = hour>12 ? hour-12: hour==0?12:hour;
        mins=mins<10 ? `0${mins}`:mins;
        time.innerHTML =`${hour}:${mins}<span id="AmPm">${AmPm}</span>`;

        setTimeout(showTime,1000);
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
   let url=`https://api.pexels.com/v1/search?query=landscape+${search}+query&per_page=30&page=1`
    fetch(url,{
        headers,
        mode:"cors",
        method:"GET"
    })
    .then(resp=>resp.json())
    .then(data=>{
        current_image_url =data.photos[Math.floor(Math.random()*30)].src.original;
        url = `${current_image_url}${img_size}`
        console.log(url);
        
        console.log(data);
        document.body.style.backgroundImage=`url(${url})`
        img_tag.setAttribute("href",current_image_url);
        img_tag.setAttribute("download","download");
        }
    )
}



function addOptions(e){
   if(e.key === "Enter"){
       let currentOptionsInput=document.getElementById("InputOptions").value;
       currentOptions.push(currentOptionsInput)
       localStorage.setItem(`LandingPageOptions`, currentOptions);
       fetch_url(currentOptionsInput)
       getOptions()
   }
    
}
function deleteOption(op){
    index=null
    index = currentOptions.findIndex( o => o===op)
    currentOptions.splice(index,1)
    localStorage.setItem(`LandingPageOptions`, currentOptions);
    getOptions()
    
}
function getOptions(){
    let optionList = document.getElementById("currentOptions")
    let list=""
    document.getElementById("InputOptions").value=""
    if(currentOptions.length>0){
        currentOptions.forEach( o => {
            list+=`
            <li>
                ${o}
                <span title="delete" onclick='deleteOption("${o}")'>
                    x
                </span>
            </li>
            `
        })
    }
    else{
        list = `<li>
                    <br>
                    No Tags Found
                    <br>
                    <br>
                </li>`
    }
    
    optionList.innerHTML=list
}

function open_option(){
    let option=document.querySelector(".options")
    if(!open_option_state){
        option.style.transform="translateY(0%)";
    }
    else{
        option.style.transform="translateY(-100%)";
    }
    open_option_state=!open_option_state
}

function getImageSize(){
    img_size = localStorage.getItem('LandingPage_image_size')
    img_size_type = localStorage.getItem('LandingPage_size')
    console.log(img_size_type);
    if(img_size===null){
        img_size = '?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1550'
    }
    let ch = document.querySelector("#sizes")
    for(let i=0;i<5;i++){
        if(ch.children[i].value===img_size_type){
            ch.children[i].selected = true;
        } 
    }
}
function setImageSize(event){
    let size =""
    sizeType = event.toElement.value;
    switch(sizeType){
        case "Small":
                size='?auto=compress&cs=tinysrgb&dpr=2&h=200'
            break;
        case 'Medium':
                size = '?auto=compress&cs=tinysrgb&dpr=2&h=400'
            break;
        case 'Large':
                size = '?auto=compress&cs=tinysrgb&dpr=2&h=600'
            break;
        case 'Large2x':
                size= '?auto=compress&cs=tinysrgb&dpr=2&h=1080'
            break
        case 'Original':
                size = ''
            break
    }
    localStorage.setItem('LandingPage_image_size',size)
    localStorage.setItem('LandingPage_size',sizeType)
}
const init=async ()=>{
    getImageSize();
    showTime();
    await geoLocation();
    let ser = currentOptions[Math.floor(Math.random()*currentOptions.length)]
    await fetch_url(ser)
    getOptions();
}

function geoLocation(){
    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
            let lat = position.coords.latitude
            let lon = position.coords.longitude
            getWeatherdata(lat,lon)
        })
    }
    else{
        console.log("error");
        
    }
}
async function getWeatherdata(lat,lon){

    if(navigator.geolocation){
        let url = `https:\\api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38eab07d571a7a518ed3f5c2624b0604&units=metric`
        console.log(url);
        
        await fetch(url)
        .then(resp =>resp.json())
        .then(data=>{
            console.log(data);
            weather.innerHTML=`
                <div class="weather">
                    <span> ${data.main.temp}&#176C  <img src="./images/fonts/${data.weather[0].icon}.svg">${data.weather[0].description}</span>
                    
                </div>
            `
        }
        )
    }
    else{

    }
}
function showPosition(position) {
    pos.lat = position.coords.latitude
    pos.lon = position.coords.longitude
}
init()