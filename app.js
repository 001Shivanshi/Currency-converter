const BASE_URL ="https://v6.exchangerate-api.com/v6/eadb2427152f8b1a885584b2/latest/"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");



for (let select of dropdowns) {
  for (Currcode in countryList) {
    newOption = document.createElement("option");
    newOption.innerText = Currcode;
    newOption.value = Currcode;
    if (select.name === "from" && Currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && Currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateflag(evt.target);

  });
}
const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=== ""|| amtVal<0){
        amtVal=1;
        amount.value="1";
    }
   
    const URL=`${BASE_URL}${fromCurr.value}`;
    let  response=await fetch(URL);
    let data= await response.json();
    let rate=data.conversion_rates[toCurr.value];
    let finalamount=amtVal*rate;
    msg.innerText= `${amtVal}${fromCurr.value}=${finalamount}${toCurr.value}`;
  };
const updateflag=(element)=>{
    let Currcode=element.value;
    let countryCode=countryList[Currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
     img.src=newSrc;
             
};


  btn.addEventListener("click",(evt) =>{
    evt.preventDefault();
    updateExchangeRate();
    
  })

  document.addEventListener("load",()=>{
    updateExchangeRate();
});
