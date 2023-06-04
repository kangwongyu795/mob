import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getFirestore, collection, query, getDocs, addDoc } from 'firebase/firestore';
import dbfire from './db'; // 파이어 베이스 구성

const YoutubeScreen = () => {
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState('');

  const fetchVideosFromFirebase = async () => {
    try {
      const videosCollection = collection(dbfire, 'YouTube');
      const querySnapshot = await getDocs(videosCollection);
      const videosData = querySnapshot.docs.map((doc) => doc.data());
      setVideos(videosData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDSRj2FRN_a8ruN59FSpnthbo-KuE_IiUg&id=${videoId}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const newVideo = data.items[0];
        setVideos((prevVideos) => [...prevVideos, newVideo]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (videoId) {
      fetchVideo();
    }
  };

  const saveVideoIdToFirebase = async () => {
    try {
      await addDoc(collection(dbfire, 'YouTube'), {
        videoId: videoId,
      });
      console.log('Video ID saved to Firebase');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideosFromFirebase();
  }, []);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, padding: 10 }}
          value={videoId}
          onChangeText={setVideoId}
          placeholder="YouTube 비디오 ID를 입력하세요"
        />
        <Button title="검색" onPress={handleSearch} />
      </View>

      <View>
        {videos.map((video, index) => (
          <View key={index}>
            
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${video.id}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </View>
        ))}
      </View>

      <Button title="유튜브 저장" onPress={saveVideoIdToFirebase} />
    </View>
  );
};

export default YoutubeScreen;

