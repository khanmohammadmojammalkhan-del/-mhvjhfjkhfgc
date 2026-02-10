const scriptURL = "https://script.google.com/macros/s/AKfycbzrnj1Ho4_bh2F8vgPVvZGMBxsyIK8HB0smJ6Guyw1ahp6cOi1hAA-ayvWN6omEvAEE/exec";

// Replace with your WhatsApp API or link template
function sendWhatsApp(player) {
  const number = player.whatsapp.replace(/\D/g,''); // remove non-digit
  const message = `Hello ${player.player_name}, your registration for eFootball Tournament is APPROVED!`;
  const url = `https://chat.whatsapp.com/KHAi52AlL63HCDvM9VDDwa?mode=gi_t`;
  window.open(url, "_blank"); // opens WhatsApp
}

async function fetchPlayers() {
  const res = await fetch(scriptURL);
  const data = await res.json();

  const tbody = document.querySelector("#playerTable tbody");
  tbody.innerHTML = "";

  data.forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index+1}</td>
      <td>${player.player_name}</td>
      <td>${player.efootball_id}</td>
      <td>${player.device}</td>
      <td>${player.team_name}</td>
      <td>${player.whatsapp}</td>
      <td>${player.entry_fee}</td>
      <td>${player.transaction_code}</td>
      <td>${player.status}</td>
      <td>
        <button class="approve" onclick="updateStatus(${index}, 'Approved')">Approve</button>
        <button class="reject" onclick="updateStatus(${index}, 'Rejected')">Reject</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function updateStatus(index, status) {
  const res = await fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "update", index, status })
  });
  fetchPlayers();
  if(status === "Approved") {
    const res2 = await fetch(scriptURL); // fetch player data
    const data = await res2.json();
    sendWhatsApp(data[index]);
  }
}

fetchPlayers();
function sendWhatsApp(index) {
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      const player = data[index];
      const number = player.whatsapp.replace(/\D/g,'');
      const message = `Hello ${player.player_name}, your registration for eFootball Tournament is APPROVED!`;
      const url = `https://chat.whatsapp.com/KHAi52AlL63HCDvM9VDDwa?mode=gi_t`;
      window.open(url, "_blank");
    });
}
