import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';

type InTabLayout = {
  DetailPage: { idKelas: string };
};

type DetailPageRouteProp = RouteProp<InTabLayout>;

type Props = {
  route: DetailPageRouteProp;
};

const DetailPage: React.FC<Props> = ({ route }) => {
  const { idKelas } = route.params;
  const [detailData, setDetailData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://10.0.2.2:8080/api/proses/${idKelas}`);
        setDetailData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };

    fetchData();

    // Clean-up function to cancel the fetch request if the component unmounts or the idKelas changes
    return () => {
      // Cancel any ongoing fetch requests here if necessary
    };
  }, [idKelas]);

  return (
    <View>
      <Text>Detail Page</Text>
      <Text>ID: {idKelas}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View>
          {/* Render the fetched data here */}
          <Text>Youtube: {detailData?.videoKelas}</Text>
        </View>
      )}
    </View>
  );
};

export default DetailPage;
