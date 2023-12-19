import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import ProfilPictureUplaod from '../../components/ProfileImage/ProfilPictureUplaod';
import { COLORS, SIZES } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useSession } from '../../hooks/useSession';
import { supabase } from '../../config/supabaseConfig';


export default function Profile() {
  const { session } = useSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfile();
  }, [session]);

  if (!session || !session.user) {
    console.warn('Session or user not available:', session);
    return null; // You may want to render a loading state or redirect the user
  }

  const { user } = session;

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.heroColour, 'black']} style={styles.background}></LinearGradient>
      <View style={styles.wrapper}>
        <Text style={styles.headline}> Profile </Text>
        <ProfilPictureUplaod dimension={150} />
        {profile && <Text style={styles.usernameText}>Username: {profile.username}</Text>}
        <Text style={styles.emailText}>Email: {user.email}</Text>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} buttonStyle={styles.signOutButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  headline: {
    fontSize: SIZES.xLarge,
    color: COLORS.fontColour,
  },
  usernameText: {
    fontSize: SIZES.medium,
    color: COLORS.fontColour,
    marginTop: 10,
    marginBottom: 10, // Add marginBottom to reduce space
  },
  emailText: {
    fontSize: SIZES.medium,
    color: COLORS.fontColour,
    marginBottom: 10, // Add marginBottom to reduce space
  },
  signOutButton: {
    // Adjust the styling of the button as needed
  },
});