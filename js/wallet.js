(function () {
  "use strict";

  if (typeof ethers === "undefined") {
    console.error("Ethers.js is not loaded.");
    return;
  }

  const Wallet = {
    provider: null,
    signer: null,
    connectedAddress: null,

    init: async function () {
      if (!window.ethereum) {
        console.error("Ethereum provider not found. Please install MetaMask.");
        return;
      }

      this.provider = new ethers.providers.Web3Provider(window.ethereum);

      window.ethereum.on("accountsChanged", (accounts) => {
        if (!accounts.length) {
          this.connectedAddress = null;
          document.dispatchEvent(new CustomEvent("walletDisconnected"));
        } else {
          this.connectedAddress = accounts[0];
          document.dispatchEvent(new CustomEvent("walletAccountChanged", {
            detail: this.connectedAddress,
          }));
        }
      });

      window.ethereum.on("chainChanged", (_chainId) => {
        window.location.reload();
      });

      const accounts = await this.provider.listAccounts();
      if (accounts.length > 0) {
        this.signer = this.provider.getSigner();
        this.connectedAddress = accounts[0];
        document.dispatchEvent(new CustomEvent("walletConnected", {
          detail: this.connectedAddress,
        }));
      }
    },

    connect: async function () {
      if (!window.ethereum) {
        throw new Error("Ethereum provider not found. Ensure MetaMask is installed.");
      }

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        this.signer = this.provider.getSigner();
        this.connectedAddress = await this.signer.getAddress();

        document.dispatchEvent(new CustomEvent("walletConnected", {
          detail: this.connectedAddress,
        }));

        return this.connectedAddress;
      } catch (error) {
        alert(error?.message || "Failed to connect wallet.");
        throw error;
      }
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    Wallet.init();

    const walletButtons = document.querySelectorAll(".connectWallet");
    walletButtons.forEach((button) => {
      button.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
          await Wallet.connect();
        } catch (error) {
          alert(error?.message || "Failed to connect wallet.");
        }
      });
    });
  });

  window.Wallet = Wallet;
})();
