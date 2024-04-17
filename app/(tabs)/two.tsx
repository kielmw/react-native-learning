import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
  DetailPage: { idKelas: string };
};

type TabTwoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetailPage'>;

type Props = {
  navigation: TabTwoScreenNavigationProp;
};

// Define the DetailPage component
const DetailPage: React.FC<{ route: { params: { idKelas: string } } }> = ({ route }) => {
  const { idKelas } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Page</Text>
      <Text>ID Kelas: {idKelas}</Text>
    </View>
  );
};

export default function TabTwoScreen({ navigation }: Props) {
  const [prosesData, setProsesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://10.0.2.2:8080/api/proses');
      setProsesData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setIsLoading(false);
    }
  };

  // Navigate to DetailPage
  const navigateToDetail = (idKelas: string) => { 
    navigation.navigate('DetailPage', { idKelas });
  };

  const renderProsesData = () => {
    return prosesData.map((item, index) => (
      <TouchableOpacity key={index} style={styles.itemButton} onPress={() => navigateToDetail(item.idKelas)}>
        <Text style={styles.itemText}>{item.idKelas} - {item.namaKelas}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proses Pembelajaran</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#007bff" />
      ) : (
        <View style={styles.itemContainer}>
          {renderProsesData()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  itemContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  itemButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
