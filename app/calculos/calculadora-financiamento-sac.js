import {
    amortizacao,
    saldoDevedor,
    juros,
    prestacao,
    totalAmortizacaoPeriodo,
    totalJurosPeriodo,
    totalPrestacoesPeriodo,
    decrescimoPrestacoes
} from './financiamento-sac';

module.exports = class CalculadoraFinanciamentoSac {
    constructor(valor = 0, i = 0, n = 0, A = 0) {
        this._A = A || amortizacao(valor, n);
        this._decrescimo = decrescimoPrestacoes(this._A, i);
        this._i = i;
        this._n = n;
    }

    amortizacao = () => {
        return this._A;
    }

    decrescimo = () => {
        return this._decrescimo;
    }

    saldoDevedor = (t) => {
        return saldoDevedor(this._A, this._n, t)
    }

    juros = (t) => {
        return juros(this._A, this._i, this._n, t)
    }

    prestacao = (t) => {
        return prestacao(this._A, this._i, this._n, t)
    }

    totalAmortizacaoPeriodo = (de, ate) => {
        return totalAmortizacaoPeriodo(this._A, de, ate)
    }

    totalJurosPeriodo = (t, k) => {
        return totalJurosPeriodo(this._A, this._i, this._n, t, k)
    }

    totalPrestacoesPeriodo = (t, k) => {
        return totalPrestacoesPeriodo(this._A, this._i, this._n, t, k)
    }

    decrescimoPrestacoes = () => {
        return decrescimoPrestacoes(this._A, this._i);
    }
}