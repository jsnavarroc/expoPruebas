// In App.js in a new project

import React from 'react';
import {
  Button,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ProgressBarAndroid,
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import Pedometer from '../components/Pedometre';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  containerBar: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
});

class Screen2 extends React.Component {
  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <Text style={styles.paragraph}>Dark Screen 2</Text>
        <Button
          title="Next screen"
          onPress={() => this.props.navigation.navigate('Opc1')}
        />
      </SafeAreaView>
    );
  }
}

const BarProgres = () => {
  return (
    <View style={styles.containerBar}>
      <ProgressBarAndroid />
      <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" progress={1} />
    </View>
  );
};

/* Navegaciión por modulos principaloes. */
const topslideNavigatorMain = createMaterialTopTabNavigator({
  Opc1: {
    screen: () => (
      <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" progress={0} />
    ),
  },
  Opc2: {
    screen: () => <Text>Option Tap 2</Text>,
  },
  Opc3: {
    screen: Screen2,
  },
});

/* Navegación por modulos segundarios. */
const slideNavigatorRewards = createDrawerNavigator(
  {
    option1: {
      screen: Pedometer,
      path: 'user/:title',
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#6a5e"
        />
      ),
    },
    option2: {
      screen: () => <Text>Login</Text>,
    },
    option3: {
      screen: () => <Text>Persist</Text>,
    },
    TopTapsOptions: {
      screen: topslideNavigatorMain,
    },
  },
  {
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleRightDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
      };
    },
    drawerPosition: 'right',
    initialRouteParams: {
      title: 'Rewards',
    } /* Se pueden establecer parametros iniciales para pasar a los diferentes componentes */,
  }
);

/* Navegaciión por modulos principaloes. */
const slideNavigatorMain = createDrawerNavigator(
  {
    Rewards: slideNavigatorRewards,
  },
  {
    getCustomActionCreators: (route, stateKey) => {
      return {
        toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey }),
      };
    },
    drawerPosition: 'left',
  }
);

const leftIcon = (navigation, icon) => (
        <Button
        onPress={() => navigation.toggleDrawer()}
        title="Izquierdo"
        color="#7ACAFF"
        />
);

const rightIcon = (navigation, icon) => {

  return (
    <Button
    onPress={() => navigation.toggleRightDrawer()}
    title="Derecho"
    color="#6a5e"
    />
  );
};

const constinerNavigation = createStackNavigator(
  {
    Main: slideNavigatorMain,
    Login: {
      screen: () => <Text>Login</Text>,

      title: `Rewards` /* Se coloca  el titulo para la parte de navegación */,
      headerRight: (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="#6a5e"
        />
      ),
    },
  },
  {
    defaultNavigationOptions: options => {
      const { navigation } = options;
      return {
        initialRouteName: 'Login' /* Se establece la ruta inicial */,
        headerStyle: {
          backgroundColor:
            '#5D2342' /* se coloca color  del fondo del header */,
        },
        headerTintColor:
          '#fff' /* Se establece el color de las elementos del heder */,
        headerTitleStyle: {
          /* Permite establecer las popiedades de la letra */
          fontWeight: 'bold',
        },
        headerLeft: leftIcon(navigation, 'bars'),
        headerRight: rightIcon(navigation, 'user'),
      };
    },
  }
);

export default createAppContainer(constinerNavigation);
