/**
 * Interactive Masscan vs Nmap Rate Simulator
 */
(function() {
  let timerId = null;

  window.masscanSim = {
    runScan: function(rate, modeName) {
      this.resetSim();

      const rateVal = document.getElementById('sim-rate-val');
      const progressVal = document.getElementById('sim-progress-val');
      const accuracyVal = document.getElementById('sim-accuracy-val');
      const timeVal = document.getElementById('sim-time-val');
      const logBox = document.getElementById('masscan-sim-log');
      const packetLane = document.getElementById('sim-packet-lane');

      const TOTAL_HOSTS = 65536;
      let estTime = (TOTAL_HOSTS / rate).toFixed(2);
      let accuracy = "100%";
      let dropText = "";

      if (rate === 1000) {
        accuracy = "100.0% (Zero Drops)";
        accuracyVal.style.color = "var(--htb-green)";
      } else if (rate === 50000) {
        accuracy = "99.8% (Optimal)";
        accuracyVal.style.color = "var(--accent-cyan)";
      } else if (rate === 1000000) {
        accuracy = "82.4% (17.6% Drops!)";
        accuracyVal.style.color = "var(--accent-red)";
        dropText = " [WARNING: Router buffer overflow! Incoming SYN-ACKs dropped]";
      }

      rateVal.innerText = rate.toLocaleString() + " pps";
      accuracyVal.innerText = accuracy;
      timeVal.innerText = estTime + "s";

      if (logBox) {
        logBox.innerHTML = `
          <div style="color: var(--htb-green); font-weight: 700;">[+] Initializing engine mode: ${modeName} at ${rate.toLocaleString()} pps...</div>
          <div>[+] Target scope: 10.10.0.0/16 (${TOTAL_HOSTS.toLocaleString()} IP addresses)</div>
          <div>[+] Allocating raw transmit socket ring buffer...</div>
        `;
      }

      // Animate Packet Stream
      if (packetLane) {
        packetLane.innerHTML = '';
        let packetCount = rate === 1000000 ? 12 : (rate === 50000 ? 8 : 4);
        
        for (let i = 0; i < packetCount; i++) {
          let p = document.createElement('div');
          p.className = 'sim-packet';
          p.style.backgroundColor = rate === 1000000 ? 'var(--accent-red)' : (rate === 50000 ? 'var(--htb-green)' : 'var(--accent-cyan)');
          p.style.left = '0%';
          p.style.top = (15 + (i % 3) * 25) + '%';
          p.innerText = 'SYN';
          packetLane.appendChild(p);

          let duration = rate === 1000000 ? 0.4 : (rate === 50000 ? 0.8 : 1.6);
          let delay = i * 0.12;

          p.style.transition = `left ${duration}s linear ${delay}s, opacity 0.2s ease`;
          setTimeout(() => {
            p.style.left = '92%';
            if (rate === 1000000 && i % 2 === 0) {
              p.classList.add('lost-packet');
              p.innerText = 'DROP';
            }
          }, 50);
        }
      }

      // Simulate Real-time Counter Progression
      let currentScanned = 0;
      let stepInc = Math.ceil(TOTAL_HOSTS / 20);
      let stepInterval = (parseFloat(estTime) * 1000) / 20;
      stepInterval = Math.max(40, Math.min(stepInterval, 250));

      timerId = setInterval(() => {
        currentScanned += stepInc;
        if (currentScanned >= TOTAL_HOSTS) {
          currentScanned = TOTAL_HOSTS;
          clearInterval(timerId);
          if (logBox) {
            logBox.innerHTML += `
              <div style="color: var(--htb-green); font-weight: 700; margin-top: 4px;">[✓] Scan complete! Duration: ${estTime}s. Final Accuracy: ${accuracy}${dropText}</div>
            `;
            logBox.scrollTop = logBox.scrollHeight;
          }
        }
        if (progressVal) {
          progressVal.innerText = currentScanned.toLocaleString() + " / " + TOTAL_HOSTS.toLocaleString();
        }
      }, stepInterval);
    },

    resetSim: function() {
      if (timerId) clearInterval(timerId);
      const rateVal = document.getElementById('sim-rate-val');
      const progressVal = document.getElementById('sim-progress-val');
      const accuracyVal = document.getElementById('sim-accuracy-val');
      const timeVal = document.getElementById('sim-time-val');
      const logBox = document.getElementById('masscan-sim-log');
      const packetLane = document.getElementById('sim-packet-lane');

      if (rateVal) rateVal.innerText = "0 pps";
      if (progressVal) progressVal.innerText = "0 / 65,536";
      if (accuracyVal) {
        accuracyVal.innerText = "100%";
        accuracyVal.style.color = "var(--text-white)";
      }
      if (timeVal) timeVal.innerText = "0.0s";
      if (packetLane) packetLane.innerHTML = "";
      if (logBox) {
        logBox.innerHTML = '<div style="color: var(--text-muted);">&gt; Simulator reset. Ready to initiate test runs.</div>';
      }
    }
  };
})();
