
var pony = {
    count: 0,
    save: function () {
        localStorage.setItem("count", pony.count);
    },
    load: function () {
        pony.count = Number(localStorage.getItem("count"));
        pony.updateCount();
    },
    updateCount: function () {
        document.getElementById("count").textContent = pony.count;
    },
    init: function () {
        pony.load();
        document.getElementById("clickarea").addEventListener("click", pony.click, false);
        window.addEventListener("unload", pony.save, false);
        setInterval(pony.save, 1000 * 60);
    },
    createBoop: function (x, y) {
        var boop = document.createElement("p");
        boop.appendChild(document.createTextNode("*boop*"));
        boop.setAttribute("class", "boop");
        boop.style.opacity = 1;
        boop.style.position = "absolute";
        boop.style.left = x - 32 + "px";
        boop.style.top = y - 16 + "px";
        document.getElementById("boops").appendChild(boop);
        setTimeout(pony.updateBoop, 50, boop);
        new Audio("boop.mp3").play();
    },
    click: function (e) {
        pony.count++;
        pony.createBoop(e.clientX, e.clientY);
        pony.updateCount();
    },
    updateBoop: function (boop) {
        var x = Number(boop.style.opacity);
        if (x < 0.1) {
            document.getElementById("boops").removeChild(boop);
        } else {
            boop.style.opacity = x - 1. / 16;
            boop.style.top = Number(boop.style.top.substr(0, boop.style.top.indexOf("px"))) - 1 + "px";
            setTimeout(pony.updateBoop, 50, boop);
        }
    }
}
