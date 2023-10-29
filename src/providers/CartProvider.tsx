import { CartItem, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { randomUUID } from "expo-crypto";
//import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
//import { useInsertOrderItems } from "@/api/order-items";
import * as SecureStore from "expo-secure-store";

//import { initialisePaymentSheet, openPaymentSheet } from "@/lib/stripe";

type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  clearCart: () => void;
  //checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  clearCart: () => {},
  //checkout: () => {},
});

const CART_STORAGE_KEY = "cartItems";

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  // Load cart items from SecureStore on component mount
  useEffect(() => {
    SecureStore.getItemAsync(CART_STORAGE_KEY).then((storedItems) => {
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    });
  }, []);

  // const { mutate: insertOrder } = useInsertOrder();
  // const { mutate: insertOrderItems } = useInsertOrderItems();

  const router = useRouter();

  const saveItemsToStorage = (updatedItems: CartItem[]) => {
    SecureStore.setItemAsync(CART_STORAGE_KEY, JSON.stringify(updatedItems));
  };

  const addItem = (product: Product) => {
    // if already in cart, increment quantity
    const existingItem = items.find((item) => item.product === product);

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(), // generate
      product,
      product_id: product.id,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
    saveItemsToStorage([newCartItem, ...items]);
  };

  // updateQuantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );

    saveItemsToStorage(items)
  };

  const total = items.reduce((sum, item) => {
    if (item.product && item.product.price !== null) {
      return sum + item.product.price * item.quantity;
    }
    return sum;
  }, 0);

  const clearCart = () => {
    setItems([]);
    SecureStore.deleteItemAsync(CART_STORAGE_KEY);
  };


  // const checkout = async () => {
  //   await initialisePaymentSheet(Math.floor(total * 100));
  //   const payed = await openPaymentSheet();
  //   if (!payed) {
  //     return;
  //   }

  //   insertOrder(
  //     { total },
  //     {
  //       onSuccess: saveOrderItems,
  //     }
  //   );
  // };

  // const saveOrderItems = (order: Tables<"orders">) => {
  //   const orderItems = items.map((cartItem) => ({
  //     order_id: order.id,
  //     product_id: cartItem.product_id,
  //     quantity: cartItem.quantity,
  //   }));

  //   insertOrderItems(orderItems, {
  //     onSuccess() {
  //       clearCart();
  //       //router.push(`/(user)/orders/${order.id}`);
  //     },
  //   });
  // };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        total,
        clearCart,
        // checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
