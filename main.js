
function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

document.getElementById('connectWallet').addEventListener('click', () => {
  alert('Wallet connect logic goes here');
