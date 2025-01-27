document.addEventListener('DOMContentLoaded', () => {
    const greetings = ["2025年快乐", "祝你在新的一年里", "阖家幸福", "万事如意", "心想事成", "岁岁平安", "红包拿来"];
    const images = ["/wx.jpg", "/zfb.jpg"]; // 修改为本地根目录路径
    let currentGreetingIndex = 0;
    let currentImageIndex = 0;

    const greetingDiv = document.getElementById('greeting');
    const imageWx = document.getElementById('wx'); // 修改为 'wx'
    const imageZfb = document.getElementById('zfb'); // 修改为 'zfb'

    function showNextGreeting() {
        if (currentGreetingIndex < greetings.length) {
            greetingDiv.textContent = greetings[currentGreetingIndex];
            greetingDiv.style.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            currentGreetingIndex++;
            startFireworks(); // 每出现一个拜年词都放个烟花
            setTimeout(showNextGreeting, 2000);
        } else {
            greetingDiv.classList.add('hidden');
            showImages();
        }
    }

    function showImages() {
        imageWx.src = "./wx.jpg"; // 修改为相对路径
        imageWx.classList.remove('hidden');
        imageZfb.src = "./zfb.jpg"; // 修改为相对路径
        imageZfb.classList.remove('hidden');
        startParticleEffect();
        setTimeout(startFireworks, 5000);
    }

    function startParticleEffect() {
        const canvas = document.getElementById('particlesCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let particlesArray = [];

        function init() {
            particlesArray = [];
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particlesArray.push(new Particle(x, y));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].size <= 0.3) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();
    }


    function startFireworks() {
        const canvas = document.getElementById('fireworksCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60); };

        var particles = [], probability = 0.04, xPoint, yPoint;

        function updateWorld() {
            update();
            paint();
            window.requestAnimationFrame(updateWorld);
        }

        function update() {
            if (particles.length < 500 && Math.random() < probability) {
                createFirework();
            }
            var alive = [];
            for (var i = 0; i < particles.length; i++) {
                if (particles[i].move()) {
                    alive.push(particles[i]);
                }
            }
            particles = alive;
        }

        function paint() {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = "rgba(0,0,0,0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';
            for (var i = 0; i < particles.length; i++) {
                particles[i].draw(ctx);
            }
        }

        function createFirework() {
            xPoint = Math.random() * (canvas.width - 200) + 100;
            yPoint = Math.random() * (canvas.height - 200) + 100;
            var nFire = Math.random() * 50 + 100;
            var c = "rgb(" + (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + ")";
            for (var i = 0; i < nFire; i++) {
                var particle = new Particle();
                particle.color = c;
                var vy = Math.sqrt(25 - particle.vx * particle.vx);
                if (Math.abs(particle.vy) > vy) {
                    particle.vy = particle.vy > 0 ? vy : -vy;
                }
                particles.push(particle);
            }
        }

        function Particle() {
            this.w = this.h = Math.random() * 4 + 1;

            this.x = xPoint - this.w / 2;
            this.y = yPoint - this.h / 2;

            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10;

            this.alpha = Math.random() * .5 + .5;

            this.color;
        }

        Particle.prototype = {
            gravity: 0.05,
            move: function() {
                this.x += this.vx;
                this.vy += this.gravity;
                this.y += this.vy;
                this.alpha -= 0.01;
                if (this.x <= -this.w || this.x >= screen.width || this.y >= screen.height || this.alpha <= 0) {
                    return false;
                }
                return true;
            },
            draw: function(c) {
                c.save();
                c.beginPath();
                c.translate(this.x + this.w / 2, this.y + this.h / 2);
                c.arc(0, 0, this.w, 0, Math.PI * 2);
                c.fillStyle = this.color;
                c.globalAlpha = this.alpha;
                c.closePath();
                c.fill();
                c.restore();
            }
        };

        updateWorld();
    }

    showNextGreeting();
});
