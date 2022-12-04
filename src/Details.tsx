import React, {useMemo} from 'react';
import {Text, Image, Button} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {DetailsScreenRouteProp} from './types';
import {
  getImagesSrcAttributesFromDoc,
  getParagraphsContentFromDoc,
} from './utils';
import {DOMParser} from '@xmldom/xmldom';
import styled from '@emotion/native';

const Details = () => {
  const {
    params: {data},
  } = useRoute<DetailsScreenRouteProp>();

  const docs = useMemo(
    () => [
      new DOMParser().parseFromString(
        '<!doctype html><html><body>'
          .concat(data.description)
          .concat('</body></html>'),
        'text/html',
      ),
    ],
    [data],
  );

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
        />
      </ImgContainer>
      <ButtonContainer>
        <Button onPress={() => {}} title="Ver en el navegador" />
      </ButtonContainer>
    </ScreenContainer>
  );
};

const StyledImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1.5;
`;

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
