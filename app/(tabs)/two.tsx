import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'Tab 1', screen: 'Screen1' },
    { title: 'Tab 2', screen: 'Screen2' },
    { title: 'Tab 3', screen: 'Screen3' },
  ];

  const navigateToScreen = (screenIndex) => {
    setActiveTab(screenIndex);
    navigation.navigate(tabs[screenIndex].screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proses Pembelajaran</Text>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tabButton, activeTab === index && styles.activeTabButton]}
            onPress={() => navigateToScreen(index)}>
            <Text style={styles.tabButtonText}>{tab.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
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
});
