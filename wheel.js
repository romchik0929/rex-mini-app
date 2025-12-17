let spinning = false;

function spin() {
  if (spinning) return;

  const betInput = document.getElementById("bet");
  const bet = parseInt(betInput.value);

  if (!bet || bet < 400) {
    document.getElementById("result").innerText =
      "❌ Минимальная ставка 400 рексов";
    return;
  }

  spinning = true;

  const wheel = document.getElementById("wheel");
  const deg = 360 * 6 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${deg}deg)`;

  setTimeout(() => {
    spinning = false;
    document.getElementById("result").innerText =
      "🎯 Колесо остановилось!";
  }, 4000);
}
