
count = 0;

function savePony() {
    localStorage.setItem("count", count);
}
function loadPony() {
    count = Number(localStorage.getItem("count"));
    updatePony();
}
function init() {
    loadPony();
    document.getElementById("pony").addEventListener("click", clickPony, false);
    window.addEventListener("unload", savePony, false);
    setInterval(savePony(), 1000 * 60);
}
function updatePony() {
    document.getElementById("count").textContent = count;
}
function clickPony(e) {
    ++count;
    createBoop(e.clientX, e.clientY);
    updatePony();
}
function createBoop(x, y) {
    var boop = document.createElement("p");
    boop.appendChild(document.createTextNode("*boop*"));
    boop.setAttribute("class", "boop");
    boop.style.opacity = 1;
    boop.style.position = "absolute";
    boop.style.left = x + "px";
    boop.style.top = y + "px";
    document.getElementById("effects").appendChild(boop);
    setTimeout(updateBoop, 100, boop);
}
function updateBoop(boop) {
    var x = Number(boop.style.opacity) - 0.1;
    if (x < 0.1) {
        document.getElementById("effects").removeChild(boop);
    } else {
        boop.style.opacity = x;
        setTimeout(updateBoop, 100, boop);
    }
}
