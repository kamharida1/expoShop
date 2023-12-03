import { useState, useEffect, memo } from "react";
import { StyleSheet, View, Alert, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

const Avatar = memo(({ url, size = 150, onUpload }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        console.warn("Cancelled");
        return;
      }

      const photo = {
        uri: result.assets[0].uri,
        type: result.assets[0].type, // You might need to adjust the type based on the result
        name: "avatar.jpg", // You might need to adjust the name based on the result
      };

      const formData = new FormData();
      formData.append("file", photo as any, "avatar.jpg"); // Adjust the filename if needed

      const fileExt = "jpg"; // You might need to adjust the file extension based on the result
      const filePath = `${Math.random()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(filePath, formData);

      if (error) {
        throw error;
      }

      onUpload(filePath);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View>
        <Button
          title={uploading ? "Uploading ..." : "Upload"}
          onPress={uploadAvatar}
          disabled={uploading}
        />
      </View>
    </View>
  );
});

export { Avatar };

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: "hidden",
    maxWidth: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#b0b0b0",
    border: "1px solid rgb(200, 200, 200)",
    borderRadius: 5,
    objectFit: "cover",
  },
});
