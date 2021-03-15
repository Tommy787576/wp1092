const sources_arr =
    ["https://images.unsplash.com/photo-1571474004502-c1def214ac6d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80",
        "https://www.wien.info/media/images/40961-schloss-schoenbrunn-brunnen-19to1.jpeg",
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80",
        "https://images.unsplash.com/photo-1604891599626-9bc48fafb832?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1063&q=80",
        "https://static.dw.com/image/43901161_303.jpg",
        "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Germany/Berlin/berlin-guide-lead-2018.jpg",
    ];
let index = 0;
let count_arr = Array(sources_arr.length).fill(0);
const previous_btn = document.getElementById("previous");
const next_btn = document.getElementById("next");

const display = document.getElementById("display");
const hyperlink = document.getElementsByTagName("a");

//window.onload = ShowImg(index);
ShowImg();
function ShowImg() {

    hyperlink[0].innerHTML = sources_arr[index];
    hyperlink[0].setAttribute("href", sources_arr[index]);
    display.src = "./images/loading.gif";
    counter();

    if (index == 0) {
        previous_btn.setAttribute("class", "disabled");
    }
    else if (index == (sources_arr.length - 1)) {
        next_btn.setAttribute("class", "disabled");
    }
    else {
        previous_btn.setAttribute("class", undefined);
        next_btn.setAttribute("class", undefined);
    }
}
function counter() {
    //button pressed and index matched
    count_arr[index] += 1;
    if (count_arr[index] <= 1) {
        // make loading.gif visible longer
        setTimeout(() => { display.src = sources_arr[index] }, 1000);
    } else {
        display.src = sources_arr[index];
    }
}

function change_img(i) {
    //when button pressed

    if (i == 0) {
        index--;
        if (index <= 0) {
            index = 0;
        }
    }
    else if (i == 1) {
        index++;
        if (index >= (sources_arr.length - 1)) {
            index = (sources_arr.length - 1);
        }
    }

    ShowImg();
    console.log(index);
}

/*
    switch (document.readyState) {
        case "loading":
            // 文件讀取中。
            display.src="./images/loading.gif"
            hyperlink[0].innerHTML = sources_arr[index];
            hyperlink[0].setAttribute("href", sources_arr[index]);
            break;
        case "interactive":
            // 文件已經完成讀取。可以使用 DOM 元素。
            display.src="./images/loading.gif"
            break;
        case "complete":
            // 頁面已經完成讀取。
            display.src = sources_arr[index];

            break;
        }

*/