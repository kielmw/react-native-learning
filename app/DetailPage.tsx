import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity} from 'react-native';
import PDFViewer from 'your-pdf-viewer-library'; // Import the PDF viewer component


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
      <Text>ID: {idKelas}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View>
          {/* Render the fetched data here */}
          <Text>Kelas: {detailData?.namaKelas}</Text>
          <Text>Youtube: {detailData?.videoKelas}</Text>
          {/* Check if pdfs and fileName exist before mapping */}
          {detailData?.pdfs && detailData.pdfs.idPdf ? (
            detailData.pdfs.idPdf.map((idPdf, index) => (
              <Text key={index} style={styles.itemText}>{idPdf}</Text>
            ))
          ) : (
            <Text>No PDFs available</Text>
          )}
        </View>
      )}
    </View>
  );  

}

export default DetailPage;
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