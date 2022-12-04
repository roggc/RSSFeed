/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useMemo, ReactNode, FC, useState} from 'react';
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
import {
  getImagesSrcAttributesFromDoc,
  getParagraphsContentFromDoc,
} from './utils';

const StyledFontAwesome5 = styled(FontAwesome5)`
  color: red;
`;

const StyledImage = styled(Image)<{aspectRatio: number}>`
  width: 100%;
  aspect-ratio: ${aspectRatio => aspectRatio};
  flex: 1;
  border-radius: 10px;
`;

const Home = () => {
  const dispatch = useDispatch<Dispatch>();
  const {data, isFetching, error} = useSelector(
    (state: AppState) => state.RSSFeed,
  );
  const {isConnected} = useSelector((state: AppState) => state.network);
  const [aspectRatios, setAspectRatios] = useState<number[]>([]);

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

  useEffect(() => {
    Array.from({length: docs.length}, (_, i) => i)
      .map(v => getImagesSrcAttributesFromDoc(v, docs)[0])
      .forEach(
        uri =>
          uri &&
          Image.getSize(uri, (width, height) =>
            setAspectRatios(aR => [...aR, width / height]),
          ),
      );
  }, [docs]);

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
