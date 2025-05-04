document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  window.showSection = (id) => {
    sections.forEach(section => {
      section.style.display = section.id === id ? 'block' : 'none';
    });
  };

  const connectBtn = document.getElementById('connectWallet');
  connectBtn.addEventListener('click', () => {
    alert('Wallet connection coming soon!');
  });

  // Výchozí zobrazení
  showSection('dashboard');
});