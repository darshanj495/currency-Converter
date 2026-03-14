const baseUrl = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const message = document.querySelector(".msg");

for(let select of dropdowns){
  for(curcode in countryList){
     let option = document.createElement("option");
     option.value = curcode;
     option.text = curcode;
     if(select.name==="from" && curcode === "USD"){
      option.selected = true;
     }
     else if(select.name==="to" && curcode === "INR"){
      option.selected = true;
     }
     select.append(option);
  }
  select.addEventListener("change", e =>{
    updateFlag(e.target);
  });
}

const updateFlag = (element) =>{
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let imgTag = element.parentElement.querySelector("img");
  imgTag.src = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
}

button.addEventListener("click", async(e) =>{
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if(amtval=== "" || amtval<1){
    amtval = 1;
    amount.value = "1";
  }

  const url = `${baseUrl}/${fromCurr.value}_${toCurr.value}.json`;

  let response = await fetch(url);
  console.log(response);
  let data = await response.json();
  let exchangeRate = data.rate;
  let final = amtval*exchangeRate;
  message.innerText = `${amtval} ${fromCurr.value} = ${final.toFixed(2)} ${toCurr.value}`;
});
