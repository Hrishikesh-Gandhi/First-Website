let total;
function genHTML(){
addEventListener("keypress",function(event){if(event.key ==='Enter'){calc();}})
 
    let html=''
for(let i=0;i<ItemList.length;i++)
{
const currHTML =
`
<div class="item">
        <div class="image">
       <img  class="image" src="${ItemList[i].image}" alt="${ItemList[i].name}">
       </div>
       <div class="itemName h">
             ${ItemList[i].name}
        </div>
         <div  class="Price h"> 
          &#8377; ${ItemList[i].price}
        </div>
         <div class="h">
            Qty:<input type="number" min="0" class="input" id="${i}"> <Button class="Button" onclick="calc();">Update</Button>
        </div>
       </div>
`
html+=currHTML;

}
document.querySelector('.itemHolder').innerHTML = html;
};
function calc(){
    let mon=0;
for(let i=0;i<ItemList.length;i++)
{
ItemList[i].qty =Number(document.getElementById(i).value);
}
for(let i=0;i<ItemList.length;i++)
{
 mon+=(ItemList[i].qty*ItemList[i].price);
}
let moneyLeft=total-mon;
if(moneyLeft <0){document.querySelector('.Money').innerHTML = 'You Are Broke Sell Some Stuff'}
else{document.querySelector('.Money').innerHTML = `&#8377; ${moneyLeft}`}
bill();
};
function start(){
 const Billion=1000000000
 switch(document.querySelector('.s').value)
 {
  case 'EM':total=32000*Billion;document.querySelector('.rich').innerHTML ='You Chose Ellon Musk ';break;
  case 'MZ':total=21000*Billion;document.querySelector('.rich').innerHTML ='You Chose Mark Zuckerberg';break;
  case 'JB':total=20500*Billion;document.querySelector('.rich').innerHTML ='You Chose Jeff Bezos';break;
  case 'LE':total=20000*Billion;document.querySelector('.rich').innerHTML ='You Chose Larry Ellison' ;break;
  case 'BG':total=15000*Billion;document.querySelector('.rich').innerHTML ='You Chose Bill Gates';break;
 }
 console.log(total);
 document.querySelector('.Selector').innerHTML='';
 genHTML();
  calc();
};
function bill(){
    let bill ='';
    let cash=0;
for(let i=0;i<ItemList.length;i++)
    {
        if(ItemList[i].qty !== 0){
     const currBill =`
      <div> ${ItemList[i].name}     ${ItemList[i].price}    *   ${ItemList[i].qty}   =   ${ItemList[i].price*ItemList[i].qty}</div>
            `;
       cash+=ItemList[i].price*ItemList[i].qty;
       bill+=currBill;}
    }
     bill+=`<div>Total Bill Is  &#8377;${cash} </div>`
document.querySelector('.bill').innerHTML = bill;

};
