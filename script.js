
var pony = {
    count: 0,
    muted: false,
    formatNumber: function (x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
    save: function () {
        localStorage.setItem("count", pony.count);
        localStorage.setItem("muted", pony.muted);
    },
    load: function () {
        pony.count = Number(localStorage.getItem("count"));
        pony.muted = Boolean(localStorage.getItem("muted"));
    },
    update: function () {
        document.getElementById("count").textContent = pony.formatNumber(pony.count) + " boops";
        var n;
        if (pony.count < 10) {
            n = 1;
        } else if (pony.count < 100) {
            n = 2;
        } else if (pony.count < 1000) {
            n = 3;
        } else {
            n = 4;
        }
        document.getElementById("pony").setAttribute("src", "assets/img/pony" + n + ".png");
        document.getElementById("mute").textContent = pony.muted ? "Unmute" : "Mute";
    },
    init: function () {
        pony.load();
        document.getElementById("clickarea").addEventListener("click", pony.click, false);
        document.getElementById("mute").addEventListener("click", function () {
            pony.muted = !pony.muted;
            pony.update();
        }, false);
        window.addEventListener("unload", pony.save, false);
        setInterval(pony.save, 1000 * 60);
        pony.update();
    },
    createBoop: function (x, y) {
        var boop = document.createElement("p");
        boop.appendChild(document.createTextNode("*boop*"));
        boop.setAttribute("class", "boop");
        boop.style.opacity = 1;
        boop.style.position = "absolute";
        boop.style.left = x - 36 + Math.random() * 8 + "px";
        boop.style.top = y - 20 + Math.random() * 8 + "px";
        var transform = "rotate(" + (Math.random() * 40 - 20) + "deg)";
        boop.style.transform = transform;
        boop.style.MozTransform = transform;
        boop.style.webkitTransform = transform;
        document.getElementById("effects").appendChild(boop);
        setTimeout(pony.updateBoop, 50, boop);
        if (!pony.muted) {
            new Audio("boop.mp3").play();
        }
    },
    click: function (e) {
        pony.count++;
        pony.createBoop(e.clientX, e.clientY);
        pony.update();
    },
    updateBoop: function (boop) {
        var x = Number(boop.style.opacity);
        if (x < 0.1) {
            document.getElementById("effects").removeChild(boop);
        } else {
            boop.style.opacity = x - 1. / 16;
            boop.style.top = Number(boop.style.top.substr(0, boop.style.top.indexOf("px"))) - 1 + "px";
            setTimeout(pony.updateBoop, 50, boop);
        }
    }
}
