import React from 'react';
import {Text, Button} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {DetailsScreenRouteProp} from './types';
import {
  getImagesSrcAttributesFromDoc,
  getParagraphsContentFromDoc,
} from './utils';
import styled from '@emotion/native';
import {useDocs} from './hooks';
import {StyledImage} from './shared';

const Details = () => {
  const {
    params: {data},
  } = useRoute<DetailsScreenRouteProp>();
  const {aspectRatios, docs} = useDocs([data]);

  return (
    <ScreenContainer>
      <TextContainer>
        <Text>{data && data.title}</Text>
      </TextContainer>
      <TextContainer>
        <Text>{getParagraphsContentFromDoc(0, docs)[1]}</Text>
      </TextContainer>
      <ImgContainer>
        <StyledImage
          source={{uri: getImagesSrcAttributesFromDoc(0, docs)[0]}}
          resizeMode="contain"
          aspectRatio={aspectRatios[0]}
        />
      </ImgContainer>
      <ButtonContainer>
        <Button onPress={() => {}} title="Ver en el navegador" />
      </ButtonContainer>
    </ScreenContainer>
  );
};

const ImgContainer = styled.View`
  margin-bottom: 10px;
`;

const ScreenContainer = styled.View`
  flex: 1;
  padding: 5px;
`;

const TextContainer = styled.View`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.View`
  align-items: center;
`;

export default Details;
