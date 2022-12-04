import React from 'react';
import {Text, Button, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {DetailsScreenRouteProp} from './types';
import {
  getImagesSrcAttributesFromDoc,
  getParagraphsContentFromDoc,
} from './utils';
import styled from '@emotion/native';
import {useDocs} from './hooks';
import {StyledImage, ScreenContainer, StyledFontAwesome5} from './shared';

const Details = () => {
  const {
    params: {data},
  } = useRoute<DetailsScreenRouteProp>();
  const {aspectRatios, docs} = useDocs([data]);

  return (
    <ScreenContainer>
      <ScrollView>
        <TextContainer>
          <Text>
            <StyledFontAwesome5 name="star" solid />{' '}
            <Text>{data && data.title}</Text>
          </Text>
        </TextContainer>
        {getParagraphsContentFromDoc(0, docs)
          .slice(1)
          .map((p, i) => (
            <TextContainer key={`${p}_${i}`}>
              <Text>{p}</Text>
            </TextContainer>
          ))}
        {getImagesSrcAttributesFromDoc(0, docs).map((uri, i) => (
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
