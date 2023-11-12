import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import Colors from "@/constants/Colors";
import { notifyUserAboutOrderUpdate } from "@/lib/notifications";
import { OrderStatusList } from "@/types";
import formatPrice from "@/utils/naira_price";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView } from "moti";
import {
  FlatList,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  // const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(idString as string);
  const { mutate: updateOrder } = useUpdateOrder();

  const updateStatus = async (status: string) => {
    await updateOrder({
      id: idString as string,
      updatedFields: { status },
    });
    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status });
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${idString}` }} />

      <FlatList
        data={order.order_items as any}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <View style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <Text style={{
                fontWeight: "bold",
                fontSize: 17,
              }}>Total</Text>
              <Text style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#555"
              }}>{formatPrice(order.total)}</Text>
            </View>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                flexGrow: 0,
                gap: 5,
              }}
            >
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    gap: 10,
                    margin: 3,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
      />
    </View>
  );
}
