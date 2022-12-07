/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, ReactNode, FC, useState} from 'react';
import {
  StatusBar,
  useColorScheme,
  ScrollView,
  Text,
  View,
  TouchableOpacityProps,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from './types';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRSSFeed, setSelectedData} from './redux/actions/rssFeed';
import {AppState, Dispatch} from './redux/configureStore';
import {
  getImagesSrcAttributesFromDoc,
  getParagraphsContentFromDoc,
} from './utils';
import {useDocuments, useDebounce} from './hooks';
import {StyledImage, ScreenContainer} from './shared';
import {StyledFontAwesome5} from './shared';
import {XMLSerializer} from '@xmldom/xmldom';

const DEBOUNCE_TIME = 1000;

const Home = () => {
  const dispatch = useDispatch<Dispatch>();
  const {data, isFetching, error} = useSelector(
    (state: AppState) => state.RSSFeed,
  );
  const {isConnected} = useSelector((state: AppState) => state.network);
  const {documents, aspectRatios, titles, ids} = useDocuments(data);
  const [searchText, setSearchText] = useState<string>('');
  const debounce = useDebounce();
  const [indexes, setIndexes] = useState<number[]>(
    Array.from({length: documents.length}, (_, i) => i),
  );

  useEffect(() => {
    isConnected && dispatch(fetchRSSFeed());
  }, [dispatch, isConnected]);

  const isDarkMode = useColorScheme() === 'dark';

  const {navigate} = useNavigation<HomeScreenNavigationProp>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setIndexes(
      !searchText
        ? titles.map((_, i) => i)
        : titles.reduce((res, t, i) => {
            if (t.toLowerCase().includes(searchText.toLowerCase())) {
              return [...res, i];
            }
            return res;
          }, [] as number[]),
    );
  }, [searchText, titles]);

  if (isFetching) {
    return (
      <ScreenContainer style={backgroundStyle}>
        <View>
          <Text>loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <StyledTextInput onChangeText={debounce(setSearchText, DEBOUNCE_TIME)} />
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
      {indexes && (
        <ScrollView>
          {indexes.map(v => (
            <Card
              testID="card"
              key={ids[v]}
              onPress={() => {
                dispatch(
                  setSelectedData({
                    document: new XMLSerializer().serializeToString(
                      documents[v],
                    ),
                    aspectRatios: aspectRatios[v],
                    title: titles[v],
                  }),
                );
                navigate('Details');
              }}>
              <TextContainer>
                <Text>
                  <StyledFontAwesome5 name="star" solid />{' '}
                  <Text>{titles[v]}</Text>
                </Text>
              </TextContainer>
              <TextContainer>
                <Text numberOfLines={2}>
                  {getParagraphsContentFromDoc(documents[v])[1]}
                </Text>
              </TextContainer>
              <StyledImage
                source={{uri: getImagesSrcAttributesFromDoc(documents[v])[0]}}
                resizeMode="contain"
                aspectRatio={aspectRatios[v]?.[0]}
              />
            </Card>
          ))}
        </ScrollView>
      )}
    </ScreenContainer>
  );
};

const ErrorContainer = styled.View`
  border: 1px solid red;
  border-radius: 2px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  margin-bottom: 10px;
`;

export default Home;

interface CardProps extends TouchableOpacityProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({children, ...props}) => (
  <CardContainer {...props}>{children}</CardContainer>
);

const CardContainer = styled.Pressable`
  border: 1px solid blue;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledTextInput = styled.TextInput`
  border-radius: 5px;
  border: 1px solid blue;
  margin-bottom: 10px;
  paddingvertical: 0px;
  height: 40px;
`;
