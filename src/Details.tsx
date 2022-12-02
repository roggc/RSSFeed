import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {DetailsScreenRouteProp} from './types';

const Details = () => {
  const {
    params: {data},
  } = useRoute<DetailsScreenRouteProp>();
  return (
    <View>
      <Text>{data && data.title}</Text>
    </View>
  );
};

export default Details;
