// ---- 1. Připojení peněženky přes Web3Modal ----
const projectId = '8c7e383e54a9de41aec00f6ef1a1e286'; // Tvůj WalletConnect ID
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

document.getElementById('connectWallet').addEventListener('click', async () => {
  try {
    const session = await modal.connect();
    provider = new ethers.BrowserProvider(session);
    signer = await provider.getSigner();
    walletAddress = await signer.getAddress();
    document.getElementById('connectWallet').innerText = `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
  } catch (e) {
    console.error('Wallet connection failed:', e);
  }
});

// ---- 2. Zobrazení sekcí ----
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');

  window.showSection = (id) => {
    sections.forEach(section => {
      section.style.display = section.id === id ? 'block' : 'none';
    });
  };

  showSection('dashboard');
  loadTokens(); // Načti tokeny při načtení
});

// ---- 3. Načtení tokenů z PepuScan API ----
async function loadTokens() {
  try {
    const res = await fetch('https://pepuscan.com/api/tokens');
    const data = await res.json();

    const presaleEl = document.getElementById('presale');
    const bondedEl = document.getElementById('bonded');

    presaleEl.innerHTML = '';
    bondedEl.innerHTML = '';

    data.tokens.forEach(token => {
      const card = `
        <div style="margin-bottom: 1rem; padding: 1rem; background:#222; border-radius:8px;">
          <strong>${token.name}</strong> (${token.symbol})<br/>
          Holders: ${token.holders} | Marketcap: ${token.marketcap}<br/>
        </div>
      `;
      if (token.bonded) {
        bondedEl.innerHTML += card;
      } else {
        presaleEl.innerHTML += card;
      }
    });
  } catch (err) {
    console.error('Token loading failed:', err);
  }
}