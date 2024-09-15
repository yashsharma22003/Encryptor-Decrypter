import { generateRandomBit, generateRandomBasis, measureBit} from "./helper.js";

export function simulateBB84(keyLength) {
  // Step 1: Alice generates random bits and bases
  const aliceBits = [];
  const aliceBases = [];
  for (let i = 0; i < keyLength; i++) {
    aliceBits.push(generateRandomBit());
    aliceBases.push(generateRandomBasis());
  }

  // Step 2: Bob randomly chooses bases to measure
  const bobBases = [];
  const bobBits = [];
  for (let i = 0; i < keyLength; i++) {
    const basis = generateRandomBasis();
    bobBases.push(basis);
    const measuredBit = measureBit(aliceBits[i], aliceBases[i], basis);
    bobBits.push(measuredBit);
  }

  // Step 3: Alice and Bob publicly compare their bases
  const matchingIndices = [];
  for (let i = 0; i < keyLength; i++) {
    if (aliceBases[i] === bobBases[i]) {
      matchingIndices.push(i);
    }
  }

  // Step 4: They keep only the bits where bases matched
  const aliceKey = matchingIndices.map(i => aliceBits[i]);
  const bobKey = matchingIndices.map(i => bobBits[i]);

  // console.log(`Admin's Original Bits:    ${aliceBits.join('        ')}`);
  // console.log(`User X's Original Bits:    ${bobBits.join('        ')}`);
  // console.log(`Admin's Bases:            ${aliceBases.join('        ')}`);
  // console.log(`User X's Bases:              ${bobBases.join('        ')}`);
  // console.log(`Matching Indices:         ${matchingIndices.join(',        ')}`);
  // console.log(`Admin's Key:              ${aliceKey.join('        ')}`);
  // console.log(`User X's Key:                ${bobKey.join('        ')}`);
  // console.log(`length is ${aliceKey.length}`);

  // Optional: Check if the keys match
  const keysMatch = aliceKey.every((bit, index) => bit === bobKey[index]);
  // console.log(`Keys Match: ${keysMatch}`);
  return aliceKey;

}

// Run the simulation
// simulateBB84(20);
