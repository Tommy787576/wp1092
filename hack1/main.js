// initialize variables
const commentInput = document.getElementById("comment-input");
const commentButton = document.getElementById("comment-button");
const cancelButton = document.getElementById("cancel-button");
const commentGroup = document.getElementById("comment-group");
const commentNum = document.getElementById("comment-num");
let commentList = ["I am Toby Chen. This is a comment."];

commentInput.addEventListener("input", () => {
    const commentInputVal = commentInput.value;

    if (commentInputVal.trim() != "") {
        commentButton.style.backgroundColor = "#065fd4";
        commentButton.disabled = false;
    }
    else {
        commentButton.style.backgroundColor = "#cccccc";
        commentButton.disabled = true;
    }
})

commentButton.addEventListener("click", () => {
    let commentInputVal = commentInput.value.trim();
    // add comment
    commentList.push(commentInputVal);

    // change innerHTML
    commentGroup.innerHTML += `
        <div class="comment">
            <img class="comment-img" src="images/user-icon.jpg"/>
            <div class="comment-right">
                <div>
                    <span class="comment-name">Toby Chen</span>
                    <span class="comment-time">現在</span>
                </div>
                <p class="comment-text">${ commentInputVal }</p>
            </div>
        </div>
    `
    console.log(commentList);

    // update comment number
    commentNum.innerText = `${commentList.length}則留言`;

    // reset the comment button style
    commentButton.style.backgroundColor = "#cccccc";
    commentInput.value = "";

    // disable the comment button
    commentButton.disabled = true;
})

commentInput.addEventListener("click", () => {
    commentButton.style.visibility = "visible";
    cancelButton.style.visibility = "visible";
})

cancelButton.addEventListener("click", () => {
    commentButton.style.visibility = "hidden";
    cancelButton.style.visibility = "hidden";
    commentInput.value = "";
    
    commentButton.style.backgroundColor = "#cccccc";
    commentButton.disabled = true;
})