import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Alert } from 'react-native';
import { COLORS, images } from '../../constants';
import { supabase } from '../../config/supabaseConfig';

export default function ProfileImage({ dimension, focused, session }) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    async function loadAvatarUrl() {
      try {
        if (!session.user || !session.user.id) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data && data.avatar_url) {
          try {
            const imageUrl = `https://gxpswfomuonmydpsyenb.supabase.co/storage/v1/object/public/avatars/${data.avatar_url}`;
            setAvatarUrl(imageUrl);

          } catch (error) {
            console.error('Error downloading image:', error.message);
            Alert.alert('Error', 'Failed to download image. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error loading image:', error.message);
        Alert.alert('Error', 'Failed to load image. Please try again.');
      }
    }

    loadAvatarUrl();
  }, [session]);

  const styles = StyleSheet.create({
    image: {
      borderRadius: dimension / 2,
      width: dimension,
      height: dimension,
      borderColor: COLORS.fontColour,
      borderWidth: focused ? 1 : 0,
    },
  });

  return (
    <View>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.image} />
      ) : (
        <Image source={images.profile} style={styles.image} />
      )}
    </View>
  );
}