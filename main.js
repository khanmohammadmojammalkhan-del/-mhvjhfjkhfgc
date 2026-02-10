const scriptURL = "https://script.google.com/macros/s/AKfycbx-hmDIfweyC94lAL1JMg8MrtSfbDJ1hzS8rWDZzQm7PhWnSoiZYuJuPOZtS0GlGZuU/exec";

document.getElementById("regForm").addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    player_name: document.getElementById("player_name").value,
    efootball_id: document.getElementById("efootball_id").value,
    device: document.getElementById("device").value,
    team_name: document.getElementById("team_name").value,
    whatsapp: document.getElementById("whatsapp").value,
    entry_fee: document.getElementById("entry_fee").value,
    transaction_code: document.getElementById("transaction_code").value
  };
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("msg").innerText = "✅ Registration Successful!";
    document.getElementById("regForm").reset();
  })
  .catch(() => {
    document.getElementById("msg").innerText = "❌ Error! Try again.";
  });
});
