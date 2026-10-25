function registerUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let age = document.getElementById("age").value;

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

   if (email === "") {
    alert("Please enter your email.");
    return;
}

if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return;
}

  if (phone === "") {
    alert("Please enter your phone number.");
    return;
}

if (!/^09\d{9}$/.test(phone)) {
    alert("Please enter a valid Philippine mobile number.");
    return;
}

if (age === "") {
    alert("Please enter your age.");
    return;
}

if (age < 1 || age > 120) {
    alert("Please enter a valid age.");
    return;
}

    fetch("https://script.google.com/macros/s/AKfycbzDVwtP7bIQKM5aDpl8PjQaMEpmfXmQ4wWqZdjApWmrQRF022_5s_GB3HiqIgbHQQHG9w/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            age: age
        })
    });

  document.getElementById("successPopup").style.display = "flex";
  startConfetti();
}

function closePopup() {
    document.getElementById("successPopup").style.display = "none";
}

function startConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
        "#ff3b30",
        "#ffcc00",
        "#34c759",
        "#007aff",
        "#af52de",
        "#ff9500"
    ];

    let pieces = [];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 7 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(piece => {
            piece.y += piece.speed;
            piece.rotation += piece.rotationSpeed;

            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);

            ctx.fillStyle = piece.color;

            ctx.fillRect(
                -piece.size / 2,
                -piece.size / 2,
                piece.size,
                piece.size
            );

            ctx.restore();
        });

        pieces = pieces.filter(piece => piece.y < canvas.height);

        if (pieces.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}