// zk-proof-generator.js
const snarkjs = require("snarkjs");
const ethers = require("ethers");

async function generateProof() {
    // Contoh: Generate ZK proof untuk sebuah angka
    const input = {
        "number": 42,  // Ganti dengan angka yang ingin diprivate-kan
    };

    // Generate proof
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, "circuit.wasm", "circuit_final.zkey");

    console.log("Proof:", proof);
    console.log("Public Signals:", publicSignals);

    // Verify proof
    const verified = await verifyProof(proof, publicSignals);
    console.log("Proof verified:", verified);
}

// Function to verify the proof
async function verifyProof(proof, publicSignals) {
    const verifierAddress = "0xYourVerifierContractAddress"; // Ganti dengan alamat smart contract verifier yang benar

    // Setup Ethereum provider
    const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/0c138d653a91456e9d6abbdc6b2be104");  // Infura API key
    const contract = new ethers.Contract(verifierAddress, ["function verifyProof(uint256[8] calldata proof, uint256[1] calldata publicSignals) external view returns (bool)"], provider);

    // Verifikasi proof di smart contract
    const verified = await contract.verifyProof(proof, publicSignals);
    return verified;
}

// Run the script
generateProof().catch(err => console.error(err));
