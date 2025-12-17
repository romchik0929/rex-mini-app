const symbols = ["🍒", "🍋", "🍊", "🍉", "7️⃣"];
const spinSound = new Audio("spin.mp3"); // создаём объект звука

document.getElementById("spinBtn").addEventListener("click", function() {
    spinSound.currentTime = 0; // чтобы звук можно было включать повторно
    spinSound.play();           // воспроизводим звук

    let spins = 10; // количество "крутов"
    
    const interval = setInterval(() => {
        document.getElementById("slot1").textContent = symbols[Math.floor(Math.random() * symbols.length)];
        document.getElementById("slot2").textContent = symbols[Math.floor(Math.random() * symbols.length)];
        document.getElementById("slot3").textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        spins--;
        if (spins <= 0) {
            clearInterval(interval);
            checkResult();
        }
    }, 100);
});

function checkResult() {
    const s1 = document.getElementById("slot1").textContent;
    const s2 = document.getElementById("slot2").textContent;
    const s3 = document.getElementById("slot3").textContent;

    let resultText = "";
    if (s1 === s2 && s2 === s3) {
        resultText = "🎉 Победа!";
    } else {
        resultText = "Попробуй ещё!";
    }
    document.getElementById("result").textContent = resultText;
}
