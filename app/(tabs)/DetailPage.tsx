import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import TabTwoScreen from './two';

type RootStackParamList = {
  DetailPage: { idKelas: string }; // Define the route params
};

type DetailPageRouteProp = RouteProp<RootStackParamList>;

type Props = {
  route: DetailPageRouteProp; // Specify the type of the route prop
};

const DetailPage: React.FC<Props> = ({ route }) => {
  const { idKelas } = route.params; // Access the id from route.params

  return (
    <View>
      <Text>Detail Page</Text>
      <Text>ID: {idKelas}</Text>
    </View>
  );
};

export default DetailPage;
