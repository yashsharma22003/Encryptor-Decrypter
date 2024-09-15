export function generateRandomBit() {
    return Math.floor(Math.random() * 2);
  }
  
  // Function to generate a random basis ('+' for rectilinear or '×' for diagonal)
 export function generateRandomBasis() {
    return Math.random() < 0.5 ? '+' : '×';
  }
  
  // Function to simulate measuring a qubit
 export function measureBit(aliceBit, aliceBasis, bobBasis) {
    if (aliceBasis === bobBasis) {
      // If bases match, Bob correctly measures the bit
      return aliceBit;
    } else {
      // If bases don't match, Bob has a 50% chance to get the correct bit
      return Math.random() < 0.5 ? (aliceBit === 0 ? 1 : 0) : aliceBit;
    }
  }