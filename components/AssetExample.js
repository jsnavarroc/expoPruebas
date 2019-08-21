import React, { Component } from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { DrawerNavigator } from 'react-navigation'; // 1.0.3
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // 4.5.0

const MyNavScreen = props => {
  const { navigation, banner } = props;
  return (
    <ScrollView style={styles.container}>
      <Text>{banner}</Text>
      <Button
        onPress={() => navigation.navigate('DrawerOpen')}
        title="Open drawered"
      />
      <Button
        onPress={() => navigation.navigate('DrawerOpen')}
        title="Go back"
      />
    </ScrollView>
  );
};

const InboxScreen = ({ navigation }) => (
  <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />
);
InboxScreen.navigationOptions = {
  drawerLabel: 'Inbox',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name="move-to-inbox"
      size={24}
      style={{ color: tintColor }}
    />
  ),
};

const DraftsScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
DraftsScreen.navigationOptions = {
  drawerLabel: 'Drafts',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
  ),
};

const DrawerExample = DrawerNavigator(
  {
    Inbox: {
      path: '/',
      screen: InboxScreen,
    },
    Drafts: {
      path: '/sent',
      screen: DraftsScreen,
    },
  },
  {
    drawerPosition: 'right',
    initialRouteName: 'Drafts',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

const MainDrawerExample = DrawerNavigator(
  {
    Drafts: {
      screen: DrawerExample,
    },
  },
  {
    drawerPosition: 'right',
    drawerOpenRoute: 'DrawerRightOpen',
  }
);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default class App extends Component {
  render() {
    return <MainDrawerExample />;
  }
}
