import { Text, FlatList, ActivityIndicator } from "react-native";
import { useMyOrderList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

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
    />
  );
}
