
var interval = 0;

function startBps() {
    if(interval > 0) clearInterval(interval);
    interval = setInterval("bps()", 1000);
}

var pony = {
    count: 0,
    muted: false,
    perClick: 1,
    perSecond: 0,
    formatNumber: function (x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
    save: function () {
        localStorage.setItem("count", pony.count);
        localStorage.setItem("muted", pony.muted);
        localStorage.setItem("perClick", pony.perClick);
        localStorage.setItem("perSecond", pony.perSecond);
    },
    load: function () {
        pony.count = Number(localStorage.getItem("count"));
        pony.muted = localStorage.getItem("muted") == "true";
        pony.perClick = Number(localStorage.getItem("perClick"));
	if(pony.perClick <= 0)
	    pony.perClick = 1;
        pony.perSecond = Number(localStorage.getItem("perSecond"));
    },
    update: function () {
        document.getElementById("count").textContent = Math.round(pony.count) + " boops";
        var n;
        if (pony.count < 10) {
            n = 1;
        } else if (pony.count < 100) {
            n = 2;
        } else if (pony.count < 1000) {
            n = 3;
        } else if (pony.count < 5000) {
			n = 4;	
		} else {
            n = 5;
        }
        document.getElementById("ponyimg").setAttribute("src", "assets/img/pony" + n + ".png");
        document.getElementById("mute").textContent = pony.muted ? "Unmute" : "Mute";
        document.getElementById("bpc").innerHTML = "boops per click: " + pony.perClick;
        document.getElementById("bps").innerHTML = "boops per second: " + pony.perSecond.toFixed(1);
    },
    init: function () {
        pony.load();
        document.getElementById("ponyclick").addEventListener("click", pony.click, false);
        document.getElementById("mute").addEventListener("click", function () {
            pony.muted = !pony.muted;
            pony.update();
        }, false);
        document.getElementById("reset").addEventListener("click", function () {
            if (confirm("Are you sure you want to reset your progress?")) {
                pony.count = 0;
                pony.perClick = 1;
                pony.perSecond = 0;
                pony.update();
            }
        });
        window.addEventListener("unload", pony.save, false);
        setInterval(pony.save, 1000 * 60);
        pony.update();
        startBps();
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
            new Audio("assets/sound/boop.mp3").play();
        }
    },
    click: function (e) {
        pony.count += pony.perClick;
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

function added(init, cost){
	switch(init){
		case 1:
		if(pony.count >= cost){ 
			pony.count -= cost;
			pony.perClick++;
		}
		break;
		case 2:
		if(pony.count >= cost){ 
			pony.count -= cost;
			pony.perSecond += 0.5;
		}
		break;
		case 3:
                if(pony.count >= cost){
                        pony.count -= cost;
                        pony.perSecond *= 1.01;
                }
                break;
                case 4:
                if(pony.count >= cost){
                        pony.count -= cost;
                        pony.perClick += 10;
                }
                break;
		default:
		break;
	}
	pony.update();
}

function bps(){
    pony.count += pony.perSecond;
    pony.update();
}
