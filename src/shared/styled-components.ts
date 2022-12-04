import styled from '@emotion/native';

export const StyledImage = styled.Image<{aspectRatio: number}>`
  width: 100%;
  aspect-ratio: ${aspectRatio => aspectRatio};
  border-radius: 10px;
`;

export const ScreenContainer = styled.View`
  flex: 1;
  padding: 10px;
`;
