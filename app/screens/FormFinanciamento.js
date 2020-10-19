import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
  Alert
} from 'react-native';

import {
  Button,
  FormLabel,
  FormValidationMessage,
  Card
} from 'react-native-elements';

import DataHolder from '../data/DataHolder';
import numeral from 'numeral';
import RoundTextInput from '../components/RoundTextInput';

const FIELD_JUROS = 'juros';
const FIELD_TEMPO = 'tempo';

const TAXA_FINANCIAMENTO = 'taxaFinanciamento';
const VALOR_FINANCIAMENTO = 'valorFinanciamento';
const TEMPO_FINANCIMANETO = 'tempoFinanciamento';

const requiredKeys = [TAXA_FINANCIAMENTO, VALOR_FINANCIAMENTO, TEMPO_FINANCIMANETO];

export default class FormFinanciamento extends React.Component {

  constructor(props) {
    super(props)
    this.inputs = {};
    this.state = {
      error: false,
      // [TAXA_FINANCIAMENTO]: 4,
      // [VALOR_FINANCIAMENTO]: 300000,
      // [TEMPO_FINANCIMANETO]: 5
      // [TAXA_FINANCIAMENTO]: 3,
      // [VALOR_FINANCIAMENTO]: 8530.20,
      // [TEMPO_FINANCIMANETO]: 10
    }

    requiredKeys.forEach(key => this.state[key] = 0);
  }

  _focusInput = (key) => {
    this.inputs[key].focus();
  }

  _submit = () => {
    keyHasValue = (key) => this.state[key];
    if (!requiredKeys.every(keyHasValue)) {
      this.setState({ error: true });
      return
    }

    this.setState({ error: false });
    requiredKeys.forEach(key => this.state[key] = numeral(this.state[key]).value());
    DataHolder.setData(this.state);

    Alert.alert(
      'Método',
      'Agora selecione o método que deseja calcular',
      [
        { text: 'Método Price', onPress: () => this.props.route.navigation(1) },
        { text: 'Método Sac', onPress: () => this.props.route.navigation(2) },
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
      ],
      { cancelable: false }
    );
  }

  render() {
    const valorFinanciamentoText = 'Valor do Financiamento';
    const taxaJurosText = 'Taxa de Juros %';
    const tempoFinanciamentoText = 'Número de Prestações';

    return (
      <View style={styles.container}>

        <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.contentContainer}>

          <Card title="Dados do financiamento" style={{ padding: 10 }}>
            <FormLabel labelStyle={styles.formLabel}>{valorFinanciamentoText}</FormLabel>
            <RoundTextInput onChangeText={text => this.setState({ [VALOR_FINANCIAMENTO]: text })}
              keyboardType='numeric'
              placeholder={valorFinanciamentoText}
              returnKeyType={"next"}
              blurOnSubmit={false}
              onSubmitEditing={this._focusInput.bind(this, FIELD_JUROS)}
              // value={numeral(this.state[VALOR_FINANCIAMENTO]).format('0.0,00')}
            />

            <FormLabel labelStyle={styles.formLabel}>{taxaJurosText}</FormLabel>
            <RoundTextInput onChangeText={text => this.setState({ [TAXA_FINANCIAMENTO]: text })}
              keyboardType='numeric'
              placeholder={taxaJurosText}
              returnKeyType={"next"}
              blurOnSubmit={false}
              getRef={component => this.inputs[FIELD_JUROS] = component}
              onSubmitEditing={this._focusInput.bind(this, FIELD_TEMPO)}
              // value={this.state[TAXA_FINANCIAMENTO].toLocaleString('pt-br')}
            />

            <FormLabel labelStyle={styles.formLabel}>{tempoFinanciamentoText}</FormLabel>
            <RoundTextInput onChangeText={text => this.setState({ [TEMPO_FINANCIMANETO]: text })}
              keyboardType='numeric'
              placeholder={tempoFinanciamentoText}
              getRef={component => this.inputs[FIELD_TEMPO] = component}
              onSubmitEditing={this._submit}
              // value={numeral(this.state[TEMPO_FINANCIMANETO]).format()}
            />

            {this.state.error ? <FormValidationMessage>{'Todos os campos são necessários'}</FormValidationMessage> : null}
            <FormLabel labelStyle={styles.obsLabel}>OBS: A taxa deve ser referente ao tipo de prestação, ex: Se o valor de prestações está em meses, a taxa deve estar em mês também</FormLabel>
            <FormLabel labelStyle={styles.obsLabel}>Valores acima devem estar em formato 0.000,00 (pt-BR)</FormLabel>
            <Button
              title='Pronto'
              backgroundColor='#1C8D76'
              onPress={this._submit}
              buttonStyle={styles.submitButton}
              rounded
            />

          </Card>
        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  contentContainer: {},
  submitButton: {
    marginTop: 20
  },
  formLabel: {
    fontSize: 15
  },
  obsLabel: {
    fontSize: 13
  }
});
