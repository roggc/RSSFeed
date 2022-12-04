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
import {StatusBar, useColorScheme, ScrollView, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from './types';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRSSFeed} from './redux/actions/rssFeed';
import {Dispatch} from './App';
import {AppState} from './redux/configureStore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const StyledFontAwesome5 = styled(FontAwesome5)`
  color: red;
  width: 20px;
`;

const Home = () => {
  const dispatch = useDispatch<Dispatch>();
  const {data, isFetching, error} = useSelector(
    (state: AppState) => state.RSSFeed,
  );
  const {isConnected} = useSelector((state: AppState) => state.network);

  useEffect(() => {
    isConnected && dispatch(fetchRSSFeed());
  }, [dispatch, isConnected]);

  const isDarkMode = useColorScheme() === 'dark';

  const {navigate} = useNavigation<HomeScreenNavigationProp>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (isFetching) {
    return (
      <View style={backgroundStyle}>
        <View>
          <Text>loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {!isConnected && (
        <View>
          <Text>you are offline</Text>
        </View>
      )}
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
              <StyledFontAwesome5 name="star" solid />
              <ContentContainer>
                <TextContainer>
                  <Text>{d.title}</Text>
                </TextContainer>
                <TextContainer>
                  <Text>{d.description}</Text>
                </TextContainer>
              </ContentContainer>
            </ItemContainer>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const ItemContainer = styled.TouchableOpacity`
  margin: 10px;
  flex-direction: row;
  align-items: center;
`;

const ErrorContainer = styled.View`
  border: 1px solid red;
  border-radius: 2px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
`;

const ContentContainer = styled.View``;

export default Home;
