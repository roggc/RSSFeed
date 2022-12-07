import React, {FC, useMemo} from 'react';
import {Text, Button, ScrollView} from 'react-native';
import {
  getImagesSrcAttributesFromDoc,
  getParagraphsContentFromDoc,
} from './utils';
import styled from '@emotion/native';
import {StyledImage, ScreenContainer, StyledFontAwesome5} from './shared';
import {DetailsScreenProps} from './types';
import {useSelector} from 'react-redux';
import {AppState} from './redux/configureStore';
import {DOMParser} from '@xmldom/xmldom';

const Details: FC<DetailsScreenProps> = () => {
  const {
    selectedData: {document, title, aspectRatios},
  } = useSelector((state: AppState) => state.RSSFeed);

  const xmlDocument = useMemo(
    () => new DOMParser().parseFromString(document),
    [document],
  );

  if (!document) {
    return null;
  }

  return (
    <ScreenContainer>
      <ScrollView>
        <TextContainer>
          <Text>
            <StyledFontAwesome5 name="star" solid /> <Text>{title}</Text>
          </Text>
        </TextContainer>
        {getParagraphsContentFromDoc(xmlDocument)
          .slice(1)
          .map((p, i) => (
            <TextContainer key={`${p}_${i}`}>
              <Text>{p}</Text>
            </TextContainer>
          ))}
        {getImagesSrcAttributesFromDoc(xmlDocument).map((uri, i) => (
          <ImgContainer key={`${uri}_${i}`}>
            <StyledImage
              source={{uri}}
              resizeMode="contain"
              aspectRatio={aspectRatios[i]}
            />
          </ImgContainer>
        ))}
        <ButtonContainer>
          <Button onPress={() => {}} title="Ver en el navegador" />
        </ButtonContainer>
      </ScrollView>
    </ScreenContainer>
  );
};

const ImgContainer = styled.View`
  margin-bottom: 10px;
`;

const TextContainer = styled.View`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;

export default Details;
