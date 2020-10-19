import * as price from './financiamento-price';

module.exports = class CalculadoraFinanciamentoPrice {
    constructor(valor = 0, i = 0, n = 0, R = 0) {
        this._R = price.prestacao(valor, i, n);
        this._i = i;
        this._n = n;
    }

    prestacao() {
        return this._R;
    }

    saldoDevedorPrice(t) {
        return price.saldoDevedorPrice(this._R, this._i, this._n, t);
    }

    saldoDevedorPriceAnterior(t) {
        return price.saldoDevedorPriceAnterior(this._R, this._i, this._n, t);
    }

    jurosPrice(t) {
        return price.jurosPrice(this._R, this._i, this._n, t);
    }

    amortizacaoPrice(t) {
        return price.amortizacaoPrice(this._R, this._i, this._n, t);
    }

    totalAmortizacaoPeriodoPrice(t, k) {
        return price.totalAmortizacaoPeriodoPrice(this._R, this._i, this._n, t, k);
    }

    totalAmortizacaoDeAtePrice(t, periodoFinal) {
        return price.totalAmortizacaoDeAtePrice(this._R, this._i, this._n, t, periodoFinal);
    }

    totalJurosPeriodoPrice(t, k) {
        return price.totalJurosPeriodoPrice(this._R, this._i, this._n, t, k);
    }

}