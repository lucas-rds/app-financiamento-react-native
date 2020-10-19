import { FVA, FRC } from './calculos-financeiros-auxiliares';

//R
prestacao = (p0, i, n) => {
    return p0 * FRC(i, n);
}

//P em t
saldoDevedorPrice = (R, i, n, t) => {
    return R * FVA(i, n - t);
}

//P em t - 1 
saldoDevedorPriceAnterior = (R, i, n, t) => {
    return R * FVA(i, (n - t) + 1);
}

//J
jurosPrice = (R, i, n, t) => {
    return i * saldoDevedorPrice(R, i, n, t - 1);
}

//A
amortizacaoPrice = (R, i, n, t) => {
    const p0 = saldoDevedorPrice(R, i, n, 0);
    const A1 = R - (i * p0);
    return A1 * (1 + i) ** (t - 1);
}

//Amortizacao acumulada entre t a t+k
totalAmortizacaoPeriodoPrice = (R, i, n, t, k) => {
    return R * (FVA(i, n - t) - FVA(i, n - t - k));
}

totalAmortizacaoDeAtePrice = (R, i, n, t, periodoFinal) => {
    return R * (FVA(i, n - (t - 1)) - FVA(i, n - periodoFinal));
}

//Juros acumulados entre t e t+k
totalJurosPeriodoPrice = (R, i, n, t, k) => {
    return (R * k) - totalAmortizacaoPeriodoPrice(R, i, n, t, k);
}

module.exports = {
    prestacao,
    saldoDevedorPrice,
    saldoDevedorPriceAnterior,
    jurosPrice,
    amortizacaoPrice,
    totalAmortizacaoPeriodoPrice,
    totalAmortizacaoDeAtePrice,
    totalJurosPeriodoPrice
}
