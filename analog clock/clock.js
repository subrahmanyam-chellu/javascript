

let hoursHand=document.getElementsByClassName("hand hours")[0];
let minutesHand=document.getElementsByClassName("hand minutes")[0];
let secondsHand=document.getElementsByClassName("hand seconds")[0];
let display=document.getElementsByClassName("display")[0];

function clock(){
    let date=new Date();
    let hours=date.getHours()%12;
    let minutes=date.getMinutes();
    let seconds=date.getSeconds();
    let meridian="AM";

    const hourDeg = (hours + minutes / 60) * 30;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const secondDeg = seconds * 6;
    secondsHand.style.transform=`translateY(-100%) translateX(-50%) rotate(${secondDeg}deg)`;
    minutesHand.style.transform=`translateY(-100%) translateX(-50%)  rotate(${minuteDeg}deg)`;
    hoursHand.style.transform=`translateY(-100%) translateX(-50%)  rotate(${hourDeg}deg)`;
    if(date.getHours()>=12){
     meridian="PM"; 
    }
    let time=`${hours}:${minutes}:${seconds} ${meridian}`;
    display.value=time;
}
setInterval(clock,1000);
clock();