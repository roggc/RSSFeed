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
import {fetchRSSFeed} from './redux/actions/rssFeed';
import {Dispatch} from './App';
import {AppState} from './redux/configureStore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  getImagesSrcAttributesFromDoc,
  getParagraphsContentFromDoc,
} from './utils';
import {useDocs, useDebounce} from './hooks';
import {StyledImage, ScreenContainer} from './shared';
import {FeedItem} from 'react-native-rss-parser';

const StyledFontAwesome5 = styled(FontAwesome5)`
  color: red;
`;

const DEBOUNCE_TIME = 1000;

const Home = () => {
  const dispatch = useDispatch<Dispatch>();
  const {data, isFetching, error} = useSelector(
    (state: AppState) => state.RSSFeed,
  );
  const {isConnected} = useSelector((state: AppState) => state.network);
  const {docs, aspectRatios} = useDocs(data);
  const [searchText, setSearchText] = useState<string>('');
  const debounce = useDebounce();
  const [filteredData, setFilteredData] = useState<FeedItem[]>(data);

  useEffect(() => {
    isConnected && dispatch(fetchRSSFeed());
  }, [dispatch, isConnected]);

  const isDarkMode = useColorScheme() === 'dark';

  const {navigate} = useNavigation<HomeScreenNavigationProp>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setFilteredData(
      !searchText
        ? data
        : data.filter(d =>
            d.title.toLowerCase().includes(searchText.toLowerCase()),
          ),
    );
  }, [searchText, data]);

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
      {filteredData && (
        <ScrollView>
          {filteredData.map((d, i) => (
            <Card
              key={d.id}
              onPress={() => {
                navigate('Details', {data: d});
              }}>
              <TextContainer>
                <Text>
                  <StyledFontAwesome5 name="star" solid />{' '}
                  <Text>{d.title}</Text>
                </Text>
              </TextContainer>
              <TextContainer>
                <Text numberOfLines={2}>
                  {getParagraphsContentFromDoc(i, docs)[1]}
                </Text>
              </TextContainer>
              <StyledImage
                source={{uri: getImagesSrcAttributesFromDoc(i, docs)[0]}}
                resizeMode="contain"
                aspectRatio={aspectRatios[i]}
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

const CardContainer = styled.TouchableOpacity`
  border: 1px solid blue;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledTextInput = styled.TextInput`
  border-radius: 5px;
  border: 1px solid blue;
  margin-bottom: 10px;
  paddingvertical: 10px;
`;
