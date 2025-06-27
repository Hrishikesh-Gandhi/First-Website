           addEventListener("keypress",function(event){if(event.key ==='Enter'){add();}})
           let html=''


let todolist = JSON.parse(localStorage.getItem('Tasks'));
if( todolist === null){todolist = []}


function render(){
   todolist.sort(function (a, b)
   { if(new Date(a.date) >new Date(b.date)){return 1;}
else if(new Date(a.date) < new Date(b.date)){return -1;}
else{if((a.time) >(b.time)){return 1;}
else if((a.time) < (b.time)){return -1;}};
}
);
html=''
for(let i=0;i<todolist.length;i++)
{
let data =todolist[i];
let name =data.task;
let time =data.time;
let date =data.date
let CURR=`<div class="task">${name}</div>
<div class="date">${date}</div>
<div class="time">${time}</div>
<div><button class="BUTTON"  onclick="todolist.splice(${i},1);render();localStorage.setItem('Tasks',JSON.stringify(todolist))">Delete</button></div>
<div><button class="BUTTON"  onclick="let val=todolist[${i}]; document.querySelector('.b').value=val.date;document.querySelector('.c').value=val.time;document.querySelector('.a').value=val.task; todolist.splice(${i},1);render();localStorage.setItem('Tasks',JSON.stringify(todolist)) ;document.querySelector('.add').innerHTML='save changes'">Edit</button></div>
`
html +=CURR;


}
document.querySelector('.todo').innerHTML = html
}
render();
function add(){
   document.querySelector('.add').innerHTML='add'
let a=document.querySelector(`.a`).value
let b =document.querySelector(`.b`).value
let c=document.querySelector(`.c`).value
let dete= {task:`${a}`,time:`${c}`,date:`${b}`}
todolist.push(dete);
localStorage.setItem('Tasks',JSON.stringify(todolist))
render();
document.querySelector(`.a`).value=''
document.querySelector(`.b`).value=''
document.querySelector(`.c`).value=''
}


function cl(){
todolist.splice(0)
localStorage.setItem('Tasks',JSON.stringify(todolist));
console.log(todolist);
console.log(JSON.parse(localStorage.getItem('Tasks')))
render();
}