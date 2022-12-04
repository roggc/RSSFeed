/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useMemo, ReactNode, FC} from 'react';
import {
  StatusBar,
  useColorScheme,
  ScrollView,
  Text,
  View,
  Image,
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
import {DOMParser} from '@xmldom/xmldom';

const StyledFontAwesome5 = styled(FontAwesome5)`
  color: red;
`;

const StyledImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1.5;
  flex: 1;
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

  const docs = useMemo(
    () =>
      data.map(d =>
        new DOMParser().parseFromString(
          '<!doctype html><html><body>'
            .concat(d.description)
            .concat('</body></html>'),
          'text/html',
        ),
      ),
    [data],
  );

  const getParagraphsContentFromDoc = (index: number) =>
    Array.prototype.map.call(
      docs[index].getElementsByTagName('p'),
      p => p.textContent,
    );

  const getImagesSrcAttributesFromDoc = (index: number) =>
    Array.prototype.map.call(docs[index].getElementsByTagName('img'), img => {
      const srcAttribute = img.getAttribute('src');
      return srcAttribute[0] === '/'
        ? 'https:'.concat(srcAttribute)
        : srcAttribute;
    });

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
          {data.map((d, i) => (
            <Card
              key={d.id}
              onPress={() => {
                console.log('pressed');
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
                  {getParagraphsContentFromDoc(i)[1]}
                </Text>
              </TextContainer>
              <ImgContainer>
                <StyledImage
                  source={{uri: getImagesSrcAttributesFromDoc(i)[0]}}
                  resizeMode="contain"
                />
              </ImgContainer>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
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

const ImgContainer = styled.View`
  border-radius: 10px;
  border: 1px solid red;
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
  padding: 5px;
  margin: 5px;
`;
