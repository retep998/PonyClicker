count = 0;
function init() {
    document.getElementById("pony").addEventListener("click", click_pony, false);
}
function click_pony() {
    ++count;
    document.getElementById("count").textContent = count;
}
