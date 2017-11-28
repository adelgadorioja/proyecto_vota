'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SPEED = 10;

// canvas setup
var canvas = document.getElementById('canvas');
var dpr = window.devicePixelRatio || 1;
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
});

var mousePos = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

var WARP = undefined;

var Confetti = function () {
    function Confetti(x, y, ctx) {
        _classCallCheck(this, Confetti);

        var dpr = window.devicePixelRatio || 1;
        this.x = x * dpr;
        this.y = y * dpr;

        this.vx = scaleBetween(x, WARP ? -WARP * dpr : -SPEED * dpr, WARP ? WARP * dpr : SPEED * dpr, 0, canvas.width / 2);
        this.vy = scaleBetween(y, WARP ? -WARP * dpr : -SPEED * dpr, WARP ? WARP * dpr : SPEED * dpr, 0, canvas.height / 2);

        this.ctx = ctx;

        // confetti parameters
        this.r = 0.1;
        this.d = 10 * dpr;
        this.ratio = this.r < this.d ? this.r / this.d : this.d / this.r;

        this.colors = ['#b8b74d', '#5658fc', '#56c8fc', '#eecee6', '#a8d99c', '#f0261d', '#92a0fd', '#f8c265', '#df642f', '#d5a446'];
        this.color = this.colors[Math.floor(this.colors.length * Math.random())];

        this.angle = 4 * dpr;
        this.tilt = Math.random();
        this.tiltAngle = Math.random();
        this.tiltAngleIncremental = 0.05 * Math.random();
    }

    Confetti.prototype.drawConfetti = function drawConfetti() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.d / 2;
        this.ctx.strokeStyle = this.color;
        this.ctx.moveTo(this.x + this.tilt + this.r, this.y);
        this.ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r);
        this.ctx.stroke();

        this.updateConfettiParticle();
    };

    Confetti.prototype.updateConfettiParticle = function updateConfettiParticle() {
        this.vx = scaleBetween(this.x, WARP ? -WARP * dpr : -SPEED * dpr, WARP ? WARP * dpr : SPEED * dpr, mousePos.x - canvas.width, mousePos.x + canvas.width);
        this.vy = scaleBetween(this.y, WARP ? -WARP * dpr : -SPEED * dpr, WARP ? WARP * dpr : SPEED * dpr, mousePos.y - canvas.height, mousePos.y + canvas.width);

        var tiltAngle = 0.01 * this.d;
        this.r = this.r > 20 ? this.r : this.r + 0.1; // max 10

        this.angle += 0.1;
        this.tiltAngle += tiltAngle;
        this.tiltAngle += this.tiltAngleIncremental;
        this.tilt = Math.sin(this.tiltAngle - this.r / 2) * this.r * 2;
        this.y += Math.sin(this.angle + this.r / 2) * 2;
        this.x += Math.sin(this.angle) / 2;
        this.x += this.vx;
        this.y += this.vy;
    };

    return Confetti;
}();

var confettis = [];

for (var i = 0; i < 200; i++) {
    addConfettiParticle();
}

function addConfettiParticle() {
    var x = window.innerWidth * Math.random();
    var y = window.innerHeight * Math.random();
    var c = new Confetti(x, y, ctx);
    confettis.push(c);
}

function draw() {
    var offset = 100;
    ctx.globalCompositeOperation = WARP ? 'lighten' : 'source-over';

    ctx.fillStyle = "rgba(255, 255, 255, 1)";

    WARP ? null : ctx.fillRect(0, 0, canvas.width, canvas.height);

    confettis.forEach(function (confetti, i) {
        confetti.drawConfetti();
        if (confetti.x < -offset || confetti.y < -offset || confetti.x > canvas.width + offset || confetti.y > canvas.height + offset) {
            confetti.dead = true;
        }
    });

    confettis.forEach(function (confetti, i) {
        if (confetti.dead) {
            confettis.splice(i, 1);
            addConfettiParticle();
        }
    });

    window.requestAnimationFrame(draw);
}

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

draw();