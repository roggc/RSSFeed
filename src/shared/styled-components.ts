import styled from '@emotion/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const StyledImage = styled.Image<{aspectRatio: number}>`
  width: 100%;
  aspect-ratio: ${aspectRatio => aspectRatio};
  border-radius: 10px;
`;

export const ScreenContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

export const StyledFontAwesome5 = styled(FontAwesome5)`
  color: red;
`;
