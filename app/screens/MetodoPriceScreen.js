import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import DataHolder from '../data/DataHolder';
import { prestacao } from '../calculos/financiamento-price';
import CalculadoraFinanciamentoPrice from '../calculos/calculadora-financiamento-price';
import RoundTextInput from '../components/RoundTextInput';
import { Text, FormValidationMessage, Card } from 'react-native-elements';

const PT_BR = 'pt-br';
const SALDO_DEVEDOR = 'saldoDevedorPrice';
const PARCELA_JUROS = 'jurosPrice';
const AMORTIZACAO = 'amortizacaoPrice';
const TOTAL_AMORTIZACAO = 'totalAmortizacaoPrice';
const TOTAL_AMORTIZACAO_T = 'TAT';
const TOTAL_AMORTIZACAO_K = 'TAK';

const TOTAL_JUROS = 'totalJurosPrice';
const TOTAL_JUROS_T = 'TJT';
const TOTAL_JUROS_K = 'TJK';



export default class MetodoPriceScreen extends React.Component {

  constructor(props) {
    super(props);
    this.defaultState = {
      [SALDO_DEVEDOR]: 0,
      [PARCELA_JUROS]: 0,
      [AMORTIZACAO]: 0,
      [TOTAL_AMORTIZACAO]: 0,
      [TOTAL_AMORTIZACAO_T]: 0,
      [TOTAL_AMORTIZACAO_K]: 0,
      [TOTAL_JUROS]: 0,
      [TOTAL_JUROS_T]: 0,
      [TOTAL_JUROS_K]: 0,
    }
    this.state = this.defaultState;
    DataHolder.subscribe(this.updateStateFinanciamento);
  }

  updateStateFinanciamento = (data) => {
    const i = data.taxaFinanciamento / 100;
    const n = data.tempoFinanciamento;
    const valor = data.valorFinanciamento;
    const R = prestacao(valor, i, n);
    const calculadora = new CalculadoraFinanciamentoPrice(valor, i, n, R);

    this.setState({ R, i, n, valor, calculadora, ...this.defaultState});
  }

  calcularEmT = (t, key, method) => {
    this.setState({ [key]: this.state.calculadora[method](Number(t)) });
  }

  calcularTotalAmortizacaoPeriodo = () => {
    const t = this.state[TOTAL_AMORTIZACAO_T];
    const k = this.state[TOTAL_AMORTIZACAO_K];
    this.setState({ [TOTAL_AMORTIZACAO]: this.state.calculadora.totalAmortizacaoPeriodoPrice(t - 1, (k - t) + 1) });
  }

  calcularTotalJurosPeriodo = () => {
    const t = this.state[TOTAL_JUROS_T];
    const k = this.state[TOTAL_JUROS_K];
    this.setState({ [TOTAL_JUROS]: this.state.calculadora.totalJurosPeriodoPrice(t - 1, (k - t) + 1) });
  }

  numberToLocale = (key) => {
    return <Text style={{ fontWeight: 'bold' }}>{this.state[key].toLocaleString(PT_BR)}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.calculadora ?
          <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.contentContainer}>


            <Card title="O valor da PRESTAÇÃO é igual a:">
              <PaddedText><Text style={{ fontWeight: 'bold' }}>R$ {this.state.R}</Text></PaddedText>
            </Card>


            <Card title="O SALDO DEVEDOR na prestação nº:">
              <RoundTextInput onChangeText={t => this.calcularEmT(t, SALDO_DEVEDOR, SALDO_DEVEDOR)}
                keyboardType='numeric'
                placeholder='Número da prestação' />
              <PaddedText>é igual a: R$ {this.numberToLocale(SALDO_DEVEDOR)}</PaddedText>
            </Card>

            <Card title="O Valor de JUROS na prestação nº:">
              <RoundTextInput onChangeText={t => this.calcularEmT(t, PARCELA_JUROS, PARCELA_JUROS)}
                keyboardType='numeric'
                placeholder='Número da prestação' />
              <PaddedText>é igual a: R$ {this.numberToLocale(PARCELA_JUROS)}</PaddedText>
            </Card>

            <Card title="O Valor da AMORTIZAÇÃO na prestação nº:">
              <RoundTextInput onChangeText={t => this.calcularEmT(t, AMORTIZACAO, AMORTIZACAO)}
                keyboardType='numeric'
                placeholder='Número da prestação' />
              <PaddedText>é igual a: R$ {this.numberToLocale(AMORTIZACAO)}</PaddedText>
            </Card>


            <Card title="O Valor TOTAL da AMORTIZAÇÃO no periodo:">
              <PaddedText>Número prestação Inicial:</PaddedText>
              <RoundTextInput
                keyboardType='numeric'
                placeholder='Número prestação Inicial'
                returnKeyType='next'
                onChangeText={t => { this.setState({ [TOTAL_AMORTIZACAO_T]: Number(t) }) }}
                onEndEditing={this.calcularTotalAmortizacaoPeriodo}
                onSubmitEditing={() => {
                  this.calcularTotalAmortizacaoPeriodo();
                  this._mesFinalTotalAmorizacao.focus();
                }} />
              <PaddedText>Número prestação Final:</PaddedText>
              <RoundTextInput
                keyboardType='numeric'
                placeholder='Número prestação Final'
                onChangeText={k => { this.setState({ [TOTAL_AMORTIZACAO_K]: Number(k) }) }}
                getRef={component => this._mesFinalTotalAmorizacao = component}
                onEndEditing={this.calcularTotalAmortizacaoPeriodo}
                onSubmitEditing={this.calcularTotalAmortizacaoPeriodo} />
              <PaddedText>é igual a: R$ {this.numberToLocale(TOTAL_AMORTIZACAO)}</PaddedText>
            </Card>

            <Card title="O Valor de JUROS ACUMULADOS no periodo:">
              <PaddedText>Número prestação Inicial:</PaddedText>
              <RoundTextInput
                keyboardType='numeric'
                placeholder='Número prestação Inicial'
                returnKeyType='next'
                onChangeText={t => { this.setState({ [TOTAL_JUROS_T]: Number(t) }) }}
                onEndEditing={this.calcularTotalJurosPeriodo}
                onSubmitEditing={() => {
                  this.calcularTotalJurosPeriodo();
                  this._mesFinalTotalJuros.focus();
                }} />
              <PaddedText>Número prestação Final:</PaddedText>
              <RoundTextInput
                keyboardType='numeric'
                placeholder='Número prestação Final'
                onChangeText={k => { this.setState({ [TOTAL_JUROS_K]: Number(k) }) }}
                getRef={component => this._mesFinalTotalJuros = component}
                onEndEditing={this.calcularTotalJurosPeriodo}
                onSubmitEditing={this.calcularTotalJurosPeriodo} />
              <PaddedText>é igual a: R$ {this.numberToLocale(TOTAL_JUROS)}</PaddedText>
            </Card>

          </ScrollView>
          : <FormValidationMessage>{'Por favor preencha os valores na tela inicial (DADOS) para iniciar os calculos.'}</FormValidationMessage>}
      </View>
    );
  }

}

const PaddedText = (props) => <Text {...props} style={styles.paddedText}> {props.children} </Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  contentContainer: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30
  },
  paddedText: {
    paddingLeft: 10
  }
});
