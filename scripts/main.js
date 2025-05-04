// WalletConnect & Pepe Unchained config
const projectId = '8c7e383e54a9de41aec00f6ef1a1e286';
const pepeChain = {
  chainId: 3409,
  name: 'Pepe Unchained',
  currency: 'PEPU',
  rpcUrl: 'https://rpc-pepe-unchained-gupg0lo9wf.t.conduit.xyz',
  blockExplorerUrl: 'https://pepuscan.com'
};

let provider;
let signer;
let walletAddress = '';

const modal = window.web3modal.createWalletConnectModal({
  projectId,
  chains: [
    {
      chainId: pepeChain.chainId,
      name: pepeChain.name,
      rpcUrl: pepeChain.rpcUrl
    }
  ]
});

// Připojení peněženky
document.getElementById('connectWallet').addEventListener('click', async () => {
  try {
    const session = await modal.connect();
    provider = new ethers.BrowserProvider(session);
    signer = await provider.getSigner();
    walletAddress = await signer.getAddress();

    document.getElementById('connectWallet').innerText =
      `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  } catch (err) {
    console.error('Wallet connection error:', err);
    alert('Failed to connect wallet.');
  }
});

// Přepínání sekcí
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  window.showSection = (id) => {
    sections.forEach(section => {
      section.style.display = section.id === id ? 'block' : 'none';
    });
  };

  showSection('dashboard');
  loadTokens();
});

// Načtení tokenů z pepuscan API
async function loadTokens() {
  const presaleEl = document.getElementById('presale');
  const bondedEl = document.getElementById('bonded');

  presaleEl.innerHTML = 'Loading...';
  bondedEl.innerHTML = 'Loading...';

  try {
    const res = await fetch('https://pepuscan.com/api/tokens');
    const data = await res.json();

    presaleEl.innerHTML = '';
    bondedEl.innerHTML = '';

    data.tokens.forEach(token => {
      const el = document.createElement('div');
      el.classList.add('token-card');
      el.innerHTML = `
        <strong>${token.name}</strong> (${token.symbol})<br/>
        Holders: ${token.holders}<br/>
        Marketcap: ${token.marketcap}
      `;

      if (token.bonded) {
        bondedEl.appendChild(el);
      } else {
        presaleEl.appendChild(el);
      }
    });
  } catch (err) {
    console.error('Token load error:', err);
    presaleEl.innerText = 'Failed to load tokens.';
    bondedEl.innerText = 'Failed to load tokens.';
  }
}