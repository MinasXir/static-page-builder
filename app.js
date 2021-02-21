sessionStorage.clear();
//array of all user input element class name , helps to loop and session storage values
const AllClasses = ["title", "TitleColor", "TopTitle", "LeftTitle", "TitleSize", "text", "FontSize", "TextColor", "Bheight", "Bwidth", "Bopacity", "LeftB", "TopB", "Bcolor", "BborderC", "Bborder", "Bimage", "BimageFromC", "LeftText", "TopText"];
// Select all close X elements
const close = document.getElementsByClassName("close");
// Create a new li item when clicking on the "Add" button
const sections = [];
function newElement() {
    const li = document.createElement("li");
    const inputValue = document.getElementById("myInput").value;
    li.innerHTML = `<div class="${inputValue}" >
        <h3>section:${inputValue}</h3>
        <details> 
        <br> 
        <summary>Background</summary>
        Section background color
        <input oninput="renderSmall(event)" class="Bcolor" type="color"  value="#999999" /><br>
        Height of section
        <input oninput="renderSmall(event)" class="Bheight" type="range" min="0" max="900" value="20" /><br>
        Width of section
        <input oninput="renderSmall(event)" class="Bwidth" type="range" min="0" max="100" value="10" /><br>
        Position from left
        <input type="range" class="LeftB" min="0" max="2000" value="10" oninput="renderSmall(event)" /><br>
        Position from Top
        <input type="range" class="TopB" min="0" max="6000" value="0" oninput="renderSmall(event)" /><br>
        Border
        <input oninput="renderSmall(event)" class="Bborder" type="range" min="0" max="1000" value="0" /><br>
        Border color
        <input oninput="renderSmall(event)" class="BborderC" type="color"  value="#000000" /><br>
        Opacity
        <input oninput="renderSmall(event)" class="Bopacity" type="range" min="0" max="100" value="100" /><br>
        Add image url
        <input type = "text" oninput="renderSmall(event)"class="Bimage" /><br>
        Add image from your machine
        <input type="file" oninput="renderSmall(event)" class="BimageFromC" name="myImage" accept="image/x-png,image/gif,image/jpeg" />  
        </details> 
        <details>  
        <summary>Content</summary>
        <br>
        Add a title
        <textarea wrap="off" placeholder="Your tittle" oninput="renderSmall(event)" class="title" rows="4" cols="50" value=""></textarea><br>
        Title color
        <input oninput="renderSmall(event)" class="TitleColor" type="color"  value="#999999" /><br>
          Title size
          <input type="range" class="TitleSize" min="10" max="200" value="20" oninput="renderSmall(event)" /><br>
          Position from left
          <input type="range" class="LeftTitle" min="-1000" max="2000" value="10" oninput="renderSmall(event)" /><br>
          Position from top
          <input type="range" class="TopTitle" min="-2000" max="2000" value="10" oninput="renderSmall(event)" /><br>
        Add a paragraph
        <textarea wrap="off" placeholder="Your paragraph" oninput="renderSmall(event)" class="text" rows="4" cols="50" value=""></textarea><br>
        Paragraph color
        <input oninput="renderSmall(event)" class="TextColor" type="color"  value="#999999" /><br>
          font size
          <input type="range" class="FontSize" min="10" max="200" value="20" oninput="renderSmall(event)" /><br>
          position from left
          <input type="range" class="LeftText" min="20" max="2000" value="10" oninput="renderSmall(event)" /><br>
          position from top
          <input type="range" class="TopText" min="20" max="2000" value="10" oninput="renderSmall(event)" />
        </details> 
        </div>`;

    // input section name validation
    if (inputValue === "") {
        alert("You must give a name to your section");
        return false;
    }
    //regex validation
    let blockSpecialRegex = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
    let numbers = /^[0-9][A-Za-z0-9 -]*$/;
    let space = /[\s]+/;
    if (inputValue.match(blockSpecialRegex)) {
        alert("Characters are not accepted as section name");
        return false;
    }
    if (inputValue.match(space)) {
        alert("Space on section name is not accepted");
        document.getElementById("myInput").value = "";
        return false;
    }
    if (inputValue.match(numbers)) {
        alert("Numbers are not accepted as section name");
        return false;
    }
    if (sections.find((element) => element === inputValue)) {
        alert("You already used that section name");
        return false;
    } else {
        document.getElementById("myUL").appendChild(li);
        const newPage = document.createElement("div");
        newPage.className = inputValue;
        document.querySelector(".pageToDownload").appendChild(newPage);
        renderPage(inputValue);
        //scroll to top when u create new section in height is big to remind that the new  is on tp
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        sections.push(inputValue);
        //close html details
        const details = document.querySelectorAll("details");
        for (i = 0; i < details.length; i++) {
            details[i].removeAttribute("open");
        }
        //scroll to current li edit section
        li.scrollIntoView({ behavior: "smooth" });
    }
    //remove previous input create section value
    document.getElementById("myInput").value = "";
    // Create a "close" button and append it to each li item
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    //remove element on close C click
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            const div = this.parentElement;
            //loop throught array of classes and delete all session storage values with current className
    for (let i = 0; i < AllClasses.length; i++) {
    sessionStorage.removeItem( `${div.firstChild.className}-${AllClasses[i]}`);}
            //remove dom elements both li and preview section
    document.querySelector(`.pageToDownload .${div.firstChild.className}`)
                .remove();
            div.remove();
            //remove the preview section section which is stored in section array
            const index = sections.indexOf(div.firstChild.className);
            if (index > -1) {sections.splice(index, 1);}
        };
    }
}
//live update of preview page for css and content values
//loop throught all class array and create session storage values
function renderSmall(e) {
const currentLiClassName = e.currentTarget.parentElement.parentElement.className;
    for (let i = 0; i < AllClasses.length; i++) {
    if (e.target.className === "BimageFromC" && e.target.files[0].name) {
    randomvar = URL.createObjectURL(event.target.files[0]);
    sessionStorage.setItem(`${currentLiClassName}-${e.currentTarget.className}`,randomvar);}
    if (e.currentTarget.className === AllClasses[i]) {
    randomvar = e.currentTarget.value;
    sessionStorage.setItem(`${currentLiClassName}-${e.currentTarget.className}`,randomvar);}
    }
    if (e.currentTarget.className === "Bcolor") {
        Bcolor = e.currentTarget.value;
        sessionStorage.setItem(`${currentLiClassName}-Bcolor`, Bcolor);
        sessionStorage.removeItem(`${currentLiClassName}-Bimage`);
        document.querySelector(`.Bimage`).value = null;
        sessionStorage.removeItem(`${currentLiClassName}-BimageFromC`);
        document.querySelector(`.BimageFromC`).value = null;
    }
    renderPage(currentLiClassName);
}
//check the user add and image url , if yes, set it as a background
function imageExists(x) {
    if (
        sessionStorage.getItem(`${x}-Bimage`) ||
        sessionStorage.getItem(`${x}-BimageFromC`)
    ) {
        return `
        background-image:url("${sessionStorage.getItem(`${x}-Bimage`) ||
            sessionStorage.getItem(`${x}-BimageFromC`)
            }") ;  
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-position: center;
            `;
    }
}
//rendering page on input event on each input or texteria
function renderPage(currentLiClassName) {
    //SECTION style
    document.querySelector(`.pageToDownload .${currentLiClassName}`).style.cssText = `
        height:${sessionStorage.getItem(`${currentLiClassName}-Bheight`)
            ? `${sessionStorage.getItem(`${currentLiClassName}-Bheight`)}vh`
            : `40px`
        }; 
        width:${sessionStorage.getItem(`${currentLiClassName}-Bwidth`)
            ? `${sessionStorage.getItem(`${currentLiClassName}-Bwidth`)}vw`
            : `40px`
        };
        background-color:${sessionStorage.getItem(`${currentLiClassName}-Bcolor`)
            ? `${sessionStorage.getItem(`${currentLiClassName}-Bcolor`)}`
            : `#999999`
        };
        opacity:${sessionStorage.getItem(`${currentLiClassName}-Bopacity`)
            ? sessionStorage.getItem(`${currentLiClassName}-Bopacity`) / 100
            : `1`
        } ;
        position:absolute;
        overflow:visible;
        left:${sessionStorage.getItem(`${currentLiClassName}-LeftB`)
            ? `${sessionStorage.getItem(`${currentLiClassName}-LeftB`)}px`
            : `0px`
        };
        top:${sessionStorage.getItem(`${currentLiClassName}-TopB`)
            ? `${sessionStorage.getItem(`${currentLiClassName}-TopB`)}px`
            : `0px`
        };
        ${imageExists(currentLiClassName)};
        border:${sessionStorage.getItem(`${currentLiClassName}-Bborder`)
            ? `${sessionStorage.getItem(`${currentLiClassName}-Bborder`)}px`
            : `0px`
        } solid ${sessionStorage.getItem(`${currentLiClassName}-BborderC`)
            ? `${sessionStorage.getItem(`${currentLiClassName}-BborderC`)}`
            : `#000000`
        };
        animation: newSection 2s forwards;`;
    //section content
    document.querySelector(`.pageToDownload .${currentLiClassName}`).innerHTML = `
    <pre> ${sessionStorage.getItem(`${currentLiClassName}-title`)
            ? sessionStorage.getItem(`${currentLiClassName}-title`)
            : ``
        }</pre>
        <pre> ${sessionStorage.getItem(`${currentLiClassName}-text`)
            ? sessionStorage.getItem(`${currentLiClassName}-text`)
            : ``
        }</pre>`;
    //title style
    document.querySelectorAll(
`.pageToDownload .${currentLiClassName} pre`
    )[0].style.cssText = `
        position:absolute;
         font-weight: 900;
        color:${sessionStorage.getItem(`${currentLiClassName}-TitleColor`)};
        font-size:${sessionStorage.getItem(`${currentLiClassName}-TitleSize`)}px;
        left:${sessionStorage.getItem(`${currentLiClassName}-LeftTitle`)}px; 
        top:${sessionStorage.getItem(`${currentLiClassName}-TopTitle`)}px;
        `;
    //paragraph style
    document.querySelectorAll(
        `.pageToDownload .${currentLiClassName} pre`
    )[1].style.cssText = `
        position:absolute;
        color:${sessionStorage.getItem(`${currentLiClassName}-TextColor`)};
        font-size:${sessionStorage.getItem(`${currentLiClassName}-FontSize`)}px;
        left:${sessionStorage.getItem(`${currentLiClassName}-LeftText`)}px; 
        top:${sessionStorage.getItem(`${currentLiClassName}-TopText`)}px;
                                           `;
}
//download the page
function download() {
    const pageToDownload = `<!DOCTYPE html><html lang="en">
        <style>
        *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow-x: hidden;
        font-family: "Raleway", sans-serif;
        }
        </style>
        <body style="margin:0;padding:0; overflow-x: hidden;">
        ${document.querySelector(".pageToDownload").innerHTML}</body></html>`;
    fileToDownload(pageToDownload);
}
//file to be downloaded
function fileToDownload(pageCodeToDownload) {
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(pageCodeToDownload)
    );
    element.setAttribute("download", "index.html");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
//hide fixed section
function displayNone(e){
    document.querySelector("#myUL").classList.toggle("displayNone");
    document.querySelector("section").classList.toggle("displayNone");
    document.querySelector("button").classList.toggle("displayNone");
    e.target.innerText === "Show" ? e.target.innerText = "Hide" : e.target.innerText = "Show";
}
//create new section with enter button
const wage = document.getElementById("myInput");
wage.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        //checks whether the pressed key is "Enter"
        newElement();
    }
});
