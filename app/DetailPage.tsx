import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Alert , Button} from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import PDFView from 'react-native-pdf';
import RNFS from 'react-native-fs';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native';

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
        const response = await axios.get(`http://10.0.2.2:8080/api/proses/itemPembelajaran/get/${idKelas}`);
        setDetailData(response.data); // Assuming response.data is an array of objects
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
  const handleDownload = async (idKelas, pdfId) => {
    try {
        const downloadUrl = `http://10.0.2.2:8080/api/proses/pdf/download/${idKelas}/${pdfId}`;

        // Open the download URL
        await Linking.openURL(downloadUrl);

        console.log('File download initiated.'); 
    } catch (error) {
        console.error('Error downloading PDF: ', error);
    }
};


return (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={[styles.container, styles.pageContainer]}>
      <Text style={styles.title}>Detail Page</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View>
          {detailData?.length > 0 ? (
            detailData.map((dataItem, index) => (
              <View key={index} style={styles.pertemuanContainer}>
                <Text style={styles.pertemuanText}>Pertemuan minggu ke - {dataItem.idPertemuan}</Text>
                {/* Render other data properties */}
                <TouchableOpacity onPress={() => handleDownload(idKelas, dataItem.idPdf)}>
                  <View style={styles.downloadContainer}>
                    <Text style={styles.headingPertemuan}>Heading Pertemuan: {dataItem.headingPertemuan}</Text>
                    <Text style={styles.bodyPertemuan}>Body Pertemuan: {dataItem.bodyPertemuan}</Text>
                    <Text style={styles.itemText}><Text style={styles.fileNameText}>{dataItem.fileName}</Text></Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No data available</Text>
          )}
        </View>
      )}
    </View>
  </ScrollView>
);


};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  pageContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pertemuanContainer: {
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  pertemuanText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  downloadContainer: {
    paddingTop: 10,
  },
  headingPertemuan: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bodyPertemuan: {
    fontSize: 16,
  },
  itemText: {
    fontSize: 14,
    color: '#007bff',
  },
  fileNameText: {
    color: 'grey',
  },
});



export default DetailPage;
