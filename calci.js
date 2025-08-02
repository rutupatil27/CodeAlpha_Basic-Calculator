let h1= document.querySelector('h1');
let allbtns= document.querySelectorAll('.keys');
let equals= document.querySelector('.equal');
let clear= document.querySelector('.clear');
let del= document.querySelector('.del');
let display= document.querySelector('.display');
let h2= document.querySelector('h2')
let resflag;

for(allbtn of allbtns){
    allbtn.addEventListener("click",function show(){
        if(resflag===true){
            h2.innerText="";
            h2.style.opacity="0.5";
            resflag=false;
        }
        h1.innerText+= this.innerText;
        evaluate();
        display.scrollLeft= display.scrollWidth;
    });
}

clear.addEventListener('click',()=>{
    h1.innerText= "";
    h2.innerText= "0";
})

del.addEventListener('click',deletekey);

function deletekey(){
    let str= h1.innerText;
    let newstr= str.slice(0,-1);
    h1.innerText= newstr;
    evaluate();
}

equals.addEventListener('click',()=>{
    evaluate();
    h1.innerText="";
    h2.style.opacity="1";
});

function evaluate(){
    try{
        let str= h1.innerText;
        let result= eval(str);
        if(str===""){
            h2.innerText=0;
            return;
        }
        if(result%1!==0){
            result = Number(result).toFixed(4);
        }
        if(result===undefined||result===null){
            h2.innerText= "Invalid";
        }
        else{
            h2.innerText= `= ${result}`;
        }
        resflag=true;
    }
    catch(error){
        h2.innerText= "Invalid";
        resflag=true;
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if(resflag===true){
        h2.innerText="";
        resflag=false;
    }
    if (!isNaN(key) || "+-*/.".includes(key)) {
        h1.innerText += key;
        evaluate();
    }
    else if(key==="Enter"){
        evaluate();
        h1.innerText="";
        h2.style.opacity="1";
    }
    else if(key==="Backspace"){
        deletekey();
    }
});

