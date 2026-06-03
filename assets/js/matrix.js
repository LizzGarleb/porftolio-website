var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
letters = letters.split('');

var fontSize = 14;
var columns = Math.floor(canvas.width / fontSize);

// Start drops at random positions so matrix is already in progress on load
var drops = Array.from({ length: columns }, function () {
    return Math.floor(Math.random() * (canvas.height / fontSize));
});

ctx.font = fontSize + "px 'Share Tech Mono', monospace";

function draw() {
    ctx.fillStyle = 'rgba(30, 30, 30, .15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#C41E3A';
    ctx.font = fontSize + "px 'Share Tech Mono', monospace";
    for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
            drops[i] = 0;
        }
    }
}

setInterval(draw, 33);
