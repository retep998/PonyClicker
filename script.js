
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
function clickPony() {
    ++count;
    updatePony();
}
