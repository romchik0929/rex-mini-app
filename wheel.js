let spinning = false;
const tg = Telegram.WebApp;

const sectors = [
  { cls: "s1", name: "❌ x0", mult: 0, chance: 40 },
  { cls: "s2", name: "🙂 x1", mult: 1, chance: 30 },
  { cls: "s3", name: "🔥 x1.5", mult: 1.5, chance: 15 },
  { cls: "s4", name: "💎 x2", mult: 2, chance: 10 },
  { cls: "s5", name: "👑 x10", mult: 10, chance: 5 }
];

const SECTOR_ANGLE = 360 / sectors.length;

function spin() {
  if (spinning) return;
  spinning = true;
  clearHighlight();

  const bet = parseInt(document.getElementById("bet").value);
  if (!bet || bet < 400) {
    show("❌ Минимальная ставка 400");
    spinning = false;
    return;
  }

  const wheel = document.getElementById("wheel");

  // сброс
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  wheel.offsetHeight;

  const result = getRandomSector();
  const index = sectors.indexOf(result);
  const sectorCenter = index * SECTOR_ANGLE + SECTOR_ANGLE / 2;

  const finalDeg = 8 * 360 + (360 - sectorCenter);

  wheel.style.transition = "transform 7s linear";
  wheel.style.transform = `rotate(${finalDeg}deg)`;

  document.getElementById("spinSound").play();

  setTimeout(() => {
    const win = Math.floor(bet * result.mult);
    highlight(result.cls);

    if (result.mult === 10) {
      document.body.classList.add("win-x10");
      setTimeout(() => {
        document.body.classList.remove("win-x10");
      }, 3000);
    }

    show(
      win > 0
        ? `🎉 Вы выиграли ${win} (${result.name})`
        : `😢 Вы проиграли (${result.name})`
    );

    tg.sendData(JSON.stringify({ bet, win }));
    spinning = false;
  }, 7000);
}

function getRandomSector() {
  let r = Math.random() * 100;
  let sum = 0;
  for (let s of sectors) {
    sum += s.chance;
    if (r <= sum) return s;
  }
}

function highlight(cls) {
  document.querySelector("." + cls).classList.add("win");
}

function clearHighlight() {
  document.querySelectorAll(".sector")
    .forEach(s => s.classList.remove("win"));
}

function show(text) {
  document.getElementById("result").innerText = text;
}
