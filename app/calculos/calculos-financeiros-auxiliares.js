
const fatorA = (i, n) => (((1 + i) ** n) - 1);
const fatorB = (i, n) => (i * (1 + i) ** n);
const FRC = (i, n) => fatorB(i, n) / fatorA(i, n);
const FVA = (i, n) => fatorA(i, n) / fatorB(i, n);

module.exports = { FRC, FVA };