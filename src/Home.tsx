/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from './types';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRSSFeed} from './redux/actions/rssFeed';

const Home = () => {
  const dispatch = useDispatch();
  const {data, isFetching, error} = useSelector(state => state.RSSFeed);

  useEffect(() => {
    dispatch(fetchRSSFeed());
  }, [dispatch]);

  const isDarkMode = useColorScheme() === 'dark';

  const {navigate} = useNavigation<HomeScreenNavigationProp>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (isFetching) {
    return (
      <SafeAreaView style={backgroundStyle}>
        <View>
          <Text>loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {error && (
        <ErrorContainer>
          <Text>{error.message}</Text>
        </ErrorContainer>
      )}
      {data && (
        <ScrollView>
          {data.map(d => (
            <ItemContainer
              key={d.id}
              onPress={() => navigate('Details', {data: d})}>
              <Text>{d.title}</Text>
            </ItemContainer>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const ItemContainer = styled.TouchableOpacity`
  margin: 10px;
`;

const ErrorContainer = styled.View`
  border: 1px solid red;
  border-radius: 2px;
`;

export default Home;
