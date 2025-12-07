const display=document.getElementById("display");
function append(input){
    display.value+=input;
}

function clearDisplay(){
    display.value="";
}

function ans(){
    try{
    display.value=eval(display.value);
    }
    catch(err){
        display.value="error!";
    }
}