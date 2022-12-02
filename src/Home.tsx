/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {parse, FeedItem} from 'react-native-rss-parser';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styled from '@emotion/native';
import {useQuery} from 'react-query';

const URL = 'https://www.xatakandroid.com/tag/feeds/rss2.xml';

const Details = () => (
  <View>
    <Text>you are seeing details screen</Text>
  </View>
);

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {isLoading, error, data} = useQuery<FeedItem[], Error>('rssFeed', () =>
    fetch(URL)
      .then(response => response.text())
      .then(xml => parse(xml))
      .then(parsed => parsed.items),
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (isLoading) {
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
            <ItemContainer key={d.id}>
              <Text>{d.title}</Text>
            </ItemContainer>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const ItemContainer = styled.View`
  margin: 10px;
`;

const ErrorContainer = styled.View`
  border: 1px solid red;
  border-radius: 2px;
`;

export default Home;
