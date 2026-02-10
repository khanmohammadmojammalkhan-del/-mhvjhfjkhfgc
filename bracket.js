const scriptURL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
const bracketDiv = document.getElementById("bracket");

async function buildBracket() {
  const res = await fetch(scriptURL);
  const data = await res.json();

  const approved = data.filter(p => p.status === "Approved");
  bracketDiv.innerHTML = "";

  approved.forEach((player, i) => {
    const pDiv = document.createElement("div");
    pDiv.className = "bracket-player";
    pDiv.innerText = `${i+1}. ${player.player_name} (${player.team_name})`;
    bracketDiv.appendChild(pDiv);
  });
}

buildBracket();
