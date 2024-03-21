import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import axios from 'axios';

export default function TabTwoScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const [prosesData, setProsesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { title: 'Tab 1', screen: 'Screen1' },
    { title: 'Tab 2', screen: 'Screen2' },
    { title: 'Tab 3', screen: 'Screen3' },
  ];

  useEffect(() => {
    if (activeTab === 0) {
      fetchData();
    }
  }, [activeTab]);

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

  const navigateToDetail = (id) => {
    // Navigasi ke halaman detail dengan membawa parameter id
    navigation.navigate('DetailPage', { id });
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
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, activeTab === index && styles.activeTabButton]}
            onPress={() => setActiveTab(index)}>
            <Text style={styles.tabButtonText}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {activeTab === 0 && (
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <View style={styles.itemContainer}>
              {renderProsesData()}
            </View>
          )}
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
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#000',
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
