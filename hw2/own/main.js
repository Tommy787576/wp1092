// the urls of images
const imgs = ["https://picsum.photos/id/1/1000/1000",
    "https://picsum.photos/id/1025/1000/1000",
    "https://picsum.photos/id/1065/1000/1000",
    "https://picsum.photos/id/1035/1000/1000",
    "https://picsum.photos/id/1052/1000/1000",
    "https://picsum.photos/id/237/1000/1000",
    "https://picsum.photos/id/1005/1000/1000",
    "https://picsum.photos/id/103/1000/1000",
    "https://picsum.photos/id/1038/1000/1000",
    "https://picsum.photos/id/1057/1000/1000",
    "https://picsum.photos/id/1084/1000/1000"]
// the index of the current image
let currIdx = 5;
// the images already loaded
let idxSet = new Set([currIdx]);

// get elements by Id
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const display = document.querySelector(".image-viewer__display");

// generate image-viewer__display-source-wrapper innerHTML
const genDisplayHTML = (idx) => {
    return `
        <img src="${imgs[idx]}" id="display" onload="loadImage()">
        <div class="image-viewer__display-source-wrapper">
            <span>Source:
                <a href="${imgs[idx]}" target="_blank" rel="noopener">
                    ${imgs[idx]}                        
                </a>
            </span>
        </div>            
    `
}

// after loading image, delete the background
function loadImage() {
    display.removeAttribute("style");
}

// add background or not
const addBackgroundOrNot = (idx) => {
    if (!idxSet.has(idx)) {
        display.style.backgroundImage = "url('./images/loading.gif')";
        idxSet.add(idx);
    }
}

// switch to the next picture
nextBtn.addEventListener("click", () => {
    previousBtn.className = "";
    if (currIdx + 1 != imgs.length) {
        currIdx += 1;
        addBackgroundOrNot(currIdx);    // add background if the image hasn't been loaded yet
        display.innerHTML = genDisplayHTML(currIdx);

        if (currIdx + 1 == imgs.length)
            nextBtn.className = "disabled";
    }
})

// switch to the previous picture
previousBtn.addEventListener("click", () => {
    nextBtn.className = "";
    if (currIdx != 0) {
        currIdx -= 1;
        addBackgroundOrNot(currIdx);    // add background if the image hasn't been loaded yet
        display.innerHTML = genDisplayHTML(currIdx);

        if (currIdx == 0)
            previousBtn.className = "disabled";
    }
})