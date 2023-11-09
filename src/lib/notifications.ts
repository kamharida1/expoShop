import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { supabase } from "./supabase";
import { Tables } from "@/types";

export async function registerForPushNotificationsAsync() {
  let token;

  try {
    if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    })
    ).data;
    console.log(token);
  } else { 
    console.log('Must use physical device for Push Notifications');
  }
  } catch (e) {
    console.log('Error registering for push Notifications',e);
  }

  return token;
}

export async function sendPushNotification(expoPushToken: string, title: string, body: string) { 
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

const getUserToken = async (userId: any) => { 
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data?.expo_push_token ;
}

export const notifyUserAboutOrderUpdate = async (order: Tables<'orders'>) => {
  const token = await getUserToken(order?.user_id);
  if (token) {
    console.log('Order: ', order);
    const title = `Your order is ${order.status}`;
    const body = `Your order #${order.id} is ${order.status}`;
    await sendPushNotification(token, title, body);
  } else {
    console.error('User token is null or undefined');
  }
} 