import styled from '@emotion/native';
import {Image} from 'react-native';

export const StyledImage = styled(Image)<{aspectRatio: number}>`
  width: 100%;
  aspect-ratio: ${aspectRatio => aspectRatio};
  border-radius: 10px;
`;
