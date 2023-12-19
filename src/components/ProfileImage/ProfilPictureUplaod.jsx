import { Text, StyleSheet, View, Image, Button, Alert, TouchableOpacity } from 'react-native';
import { COLORS, images } from '../../constants';
import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseConfig';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { useSession } from '../../hooks/useSession';
import ProfileImage from './ProfileImage';

export default function ProfilPictureUplaod({ dimension }) {
  const { session } = useSession();
  const [files, setFiles] = useState([]);
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  useEffect(() => {
    if (!session.user) return;

    loadImage();
  }, [session.user]);
 
  async function loadImage() {
   try {
    const { data, error } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', session.user.id)
      .single();
     
    if (error) {
      throw error;
    }

     if (data && data.avatar_url) {
      downloadImage(data.avatar_url);
    }
  } catch (error) {
    console.error('Error loading image:', error.message);
    Alert.alert('Error', 'Failed to load image. Please try again.');
  }
  }

async function downloadImage(path) {
  try {
    const imageUrl = `https://gxpswfomuonmydpsyenb.supabase.co/storage/v1/object/public/avatars/${path}`;
    setSelectedImageUri(imageUrl); 
  } catch (error) {
    console.error('Error downloading image:', error.message);
    Alert.alert('Error', 'Failed to download image. Please try again.');
  }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    image: {
      borderRadius: dimension / 2,
      width: dimension,
      height: dimension,
      borderColor: COLORS.fontColour,
    },
    text: {
      fontSize: 20,
      color: 'white',
    },
  });

  async function onSelectedImage() {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permission to access media library denied');
    }

    // Let the user pick an image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // If the user successfully selected an image, remove all existing images in the bucket
      await removeAllImages();

      const img = result.assets[0];
       console.log(img.uri);
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const filePath = `${session.user.id}/${new Date().getTime()}.${
        img.type === 'image' ? 'png' : 'mp4'
      }`;
      const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
      await supabase.storage.from('avatars').upload(filePath, decode(base64), { contentType });
      
       const { error: profileError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', session.user.id);


      if (profileError) {
        throw profileError;
      }

      loadImage();
    }
  } catch (error) {
    console.error('ImagePicker Error:', error.message);
    Alert.alert('Error', 'Failed to load image. Please try again.');
  }
  }
  
  async function removeAllImages() {
  try {
    // Fetch a list of all files in the bucket
    const { data: files, error } = await supabase.storage
      .from('avatars')
      .list(session.user.id);

    if (error) {
      throw error;
    }

    // Delete each file in the bucket
    await Promise.all(
      files.map(async (file) => {
        await supabase.storage.from('avatars').remove([`${session.user.id}/${file.name}`]);
      })
    );

    console.log('All images removed successfully');
  } catch (error) {
    console.error('Error removing images:', error.message);
    Alert.alert('Error', 'Failed to remove existing images. Please try again.');
  }
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSelectedImage}>
      {selectedImageUri ? (
        <Image key={selectedImageUri} source={{ uri: selectedImageUri }} style={styles.image} />
      ) : (
        <Image key={images.profile} source={images.profile} style={styles.image} />
        )}
      </TouchableOpacity>
    </View>
  );
}