import { Text, FlatList, ActivityIndicator, Pressable, View } from "react-native";
import { useMyOrderList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";

import * as Notifications from "expo-notifications";
import { LinearGradient } from "expo-linear-gradient";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: null,
    });
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  console.log('Orderlist item on /user/orders',orders);

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      ListFooterComponent={() => (
        <>
          <Pressable
            onPress={schedulePushNotification}
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              elevation: 1,
              marginTop: 50,
            }}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={["#00CED1", "#48D1CC", "#00C5CD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                backgroundColor: "red",
                padding: 5,
                borderRadius: 5,
                marginRight: 10,
                flex: 1,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                Notify User
              </Text>
            </LinearGradient>
          </Pressable>
        </>
      )}
    />
  );
}
