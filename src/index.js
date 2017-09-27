import style from "./style.css";

var cont = document.querySelector("#homework-container");
var list = document.querySelectorAll(".list");
function handleDrag(e) {
    e.preventDefault();
}

cont.ondragenter = handleDrag;
cont.ondragover = handleDrag;

cont.ondragstart = function(e) {
    document
        .querySelectorAll(".dragged")
        .forEach(el => el.classList.remove("dragged"));
    if (e.target.className == "item") {
        // draggedID = e.target.id;
        // e.dataTransfer.effectAllowed = "move";
        e.target.classList.add("dragged");
    } else {
        e.preventDefault();
    }
};

function drop(e) {
    e.preventDefault();

    let item = document.querySelector(".dragged");

    // console.log(this);
    if (this.classList.contains("list")) {
        this.appendChild(item);
    }
    item.classList.remove("dragged");
}

list.forEach(el => el.addEventListener("drop", drop, false));
// cont.addEventListener("drop", drop, false);
