import React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, TextInput } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MetodoPriceScreen from './app/screens/MetodoPriceScreen';
import MetodoSacScreen from './app/screens/MetodoSacScreen';
import { SafeAreaView } from 'react-navigation';
import FormFinanciamento from './app/screens/FormFinanciamento';
import numeral from 'numeral';
import 'numeral/locales';

SafeAreaView.setStatusBarHeight(0);
numeral.locale('pt-br');

// import sac from './app/calculos/financiamento-sac';
// const n = 5;
// const i = 4 / 100;
// const A = sac.amortizacao(300000, n);
// const p4 = sac.prestacao(A, i, n, 4);
// const juros2 = sac.juros(A, i, n, 2);
// const jurosAcumulados = sac.totalJurosPeriodo(A, i, n, 1, 2);
// const totalPrestacoes = sac.totalPrestacoesPeriodo(A, i, n, 3, 2);
// const decresimo = sac.decrescimoPrestacoes(A, i);

// console.log('A', A);
// console.log('p2', p4);
// console.log('juros2', juros2);
// console.log('jurosAcumulados', jurosAcumulados);
// console.log('totalPrestacoes', totalPrestacoes);
// console.log('decrescimo', decresimo);

// set REACT_NATIVE_PACKAGER_HOSTNAME=172.23.195.225
export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'financiamento',
        title: 'Dados',
        navigation: this._updateRoute.bind(this)
      },
      {
        key: 'price',
        title: 'Método Price',
        navigation: this._updateRoute.bind(this)
      },
      {
        key: 'sac',
        title: 'Método Sac',
        navigation: this._updateRoute.bind(this)
      },
    ],
  };

  _updateRoute(newIdx) {
    this.setState({ index: newIdx })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <TabView
          renderTabBar={props =>
            <TabBar
              {...props}
              style={{ backgroundColor: '#16715F' }}
              scrollEnabled={true}
            />
          }
          navigationState={this.state}
          renderScene={SceneMap({
            financiamento: FormFinanciamento,
            price: MetodoPriceScreen,
            sac: MetodoSacScreen
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            height: 0,
            width: Dimensions.get('window').width
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
