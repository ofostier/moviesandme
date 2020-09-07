import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./Navigation/Navigation";
import MainTabs from "./Navigation/MainTab";
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import Store from './Store/configureStore';

export default class App extends React.Component {
  render() {
    return (
        <Provider store={Store}>
            <PaperProvider>
                <NavigationContainer>
                    <MainTabs></MainTabs>
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    )
  }
}

