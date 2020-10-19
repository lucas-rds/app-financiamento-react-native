amortizacao = (p0, n) => {
    return p0 / n;
}

saldoDevedor = (A, n, t) => {
    return A * (n - t)
}

juros = (A, i, n, t) => {
    return (i * saldoDevedor(A, n, t - 1))
}

prestacao = (A, i, n, t) => {
    return A * (1 + i * (n - t + 1))
}

totalAmortizacaoPeriodo = (A, de, ate) => {
    return A * (ate - de)
}

totalJurosPeriodo = (A, i, n, t, k) => {
    return i * A * k * (n - t - ((k - 1) / 2));
}

totalPrestacoesPeriodo = (A, i, n, t, k) => {
    return A * k * (1 + i * (n - t - ((k - 1) / 2)))
}

decrescimoPrestacoes = (A, i) => {
    return A * i;
}

module.exports = {
    amortizacao,
    saldoDevedor,
    juros,
    prestacao,
    totalAmortizacaoPeriodo,
    totalJurosPeriodo,
    totalPrestacoesPeriodo,
    decrescimoPrestacoes
}
