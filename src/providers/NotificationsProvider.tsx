import { ExpoPushToken } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useAuth } from "./UserProvider";
import { supabase } from "@/lib/supabase";
import { registerForPushNotificationsAsync } from "@/lib/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

const NotificationsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();

  const { profile } = useAuth();

  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken);
    if (!newToken) return;
    
    await supabase
      .from('profiles')
      .update({ expo_push_token: newToken })
      .eq('id', profile?.id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => savePushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, []);

  console.log('Push token: ', expoPushToken);
  console.log('Notification: ', notification);

  return <>{children}</>
};

export default NotificationsProvider;
