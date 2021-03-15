var links = ["https://i0.wp.com/zhuantravel.com/wp-content/uploads/2019/01/2018-12-31-17.59.26.jpg?w=2400&ssl=1",
             "https://lh3.googleusercontent.com/ZJX6AQQkxU52qhtgwTNAA4-2oHgu3s1m2Mlz0c8_RR9KeRwWYuibwN78sByr1w6xRbSi7mDq3UYLDeR5swBLpGleu_3OwfA=s600",
             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhrypTD8RACjkPQjsOqn8XKRePeyvmu2Tu9g&usqp=CAU",
             "https://lh3.googleusercontent.com/G9HeQceKIjjnJ12AENSpo7D3nxM0hrss52Pg58XTMHGBlMneg4LnZiejfkAjHRo-XV6XqjoJE8W1tRTbQA0rGmScBi7BGw=s1280",
             "https://lh3.googleusercontent.com/eVt9Q9oImMIBLRKtRtmkY8HqpSNo0Wc8-ucW8YTNYR5m4H1nef0QEBw01two1kOu4wBs1xzzi3kF4aqG2a-7RUBi12wumG4=s1280",
             "https://lh3.googleusercontent.com/Cf5C-cOICWmdBxPdRIZQK5wxtLzlCcVbei6xGOWnvqReKy5d1NY47c9k2rBwPCwwkl3JGZ0xkypgsujKEYOz0farhjmCGZI=s1280"];
          
const back_butt = document.getElementById("back_butt");
const next_butt = document.getElementById("next_butt");
var index = 0;

function disable(butt){
    butt.disabled=true;
    butt.className='disabled';
}
function enable(butt){
    butt.disabled=false;
    butt.className='image-viewer__button';
}
function check(){
    document.getElementById('display').src = "images/loading.gif";
    var timeoutID = window.setTimeout(() => {
        document.getElementById('display').src = links[index];
        document.getElementById('source').href = links[index];
        document.getElementById('source').innerHTML = links[index];
        document.getElementById('source').href = links[index];
    }, 20);
    if (index <= 0){
        disable(back_butt);
    }
    else if (index >= links.length-1){
        disable(next_butt);
    }
    else{

        enable(back_butt);
        enable(next_butt);
    }
}
check();
/* */
back_butt.addEventListener('click', 
    function back(){
        if (index > 0)index -= 1;
        console.log(index);
        check();
    }
);
/* */
next_butt.addEventListener('click',
    function next(){
        if (index < links.length-1) index += 1;
        console.log(index);
        check();
    }
)
