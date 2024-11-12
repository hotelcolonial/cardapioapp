import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type LanguageType = "pt" | "en" | "es";

export interface LanguageOptions {
  en: string;
  pt: string;
  es: string;
}

export interface Dish {
  id?: number;
  name: LanguageOptions;
  price: number;
  info: LanguageOptions;
  categoryId?: number;
}

export interface Category {
  id?: number;
  name: LanguageOptions;
  picUrl: string;
  menuTypeId: number;
  dishes?: Dish[];
}

export interface Menu {
  id: number;
  name: string;
  categories: Category[];
}

export interface CartItem {
  id: number;
  quantity: number;
  dishId: number;
  cartId: number;
  dish: Dish;
  cart: number;
}

export interface Cart {
  id: number;
  sessionId: string;
  cartItems: CartItem[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  dishId: number;
  cartId: number;
  dish: Dish;
  cart: number;
}

export interface Order {
  id?: number;
  sessionId: string;
  clientName: string;
  total: number;
  roomNumber: number;
  status: string;
  orderItems: OrderItem[];
  remainingTime: number;
}

export interface TimeConfiguration {
  waitTime: number;
  messageActivated: boolean;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Menu", "Dishes", "Category", "Cart", "Order"],
  endpoints: (build) => ({
    getMenuByType: build.query<Menu, { menuTypeId: number }>({
      query: ({ menuTypeId }) => `menu/getmenu/${menuTypeId}`,
      providesTags: ["Menu"],
    }),
    createCategory: build.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: "menu/createcategory",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Menu"],
    }),
    getCategory: build.query<Category, { categoryId: number }>({
      query: ({ categoryId }) => `menu/getcategorybyid/${categoryId}`,
      providesTags: ["Category"],
    }),
    updateCategory: build.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: `menu/editcategory/${category.id}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: ["Menu", "Category"],
    }),
    deleteCategory: build.mutation<Category, { categoryId: number }>({
      query: ({ categoryId }) => ({
        url: `menu/deletecategory/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
    createDish: build.mutation<Dish, Partial<Dish>>({
      query: (dish) => ({
        url: "menu/createdish",
        method: "POST",
        body: dish,
      }),
      invalidatesTags: ["Dishes"],
    }),
    getDishesByCategory: build.query<Dish[], { categoryId: number }>({
      query: ({ categoryId }) => `menu/getdishesbycategory/${categoryId}`,
      providesTags: (result, error, { categoryId }) =>
        result && result.length > 0
          ? [
              ...result.map(({ id }) => ({ type: "Dishes" as const, id })),
              { type: "Dishes" as const, id: categoryId }, // Asegúrate de incluir la categoría
            ]
          : [{ type: "Dishes" as const, id: categoryId }],
    }),
    updateDish: build.mutation<Dish, Partial<Dish>>({
      query: (dish) => ({
        url: `menu/editdish/${dish.id}`,
        method: "PATCH",
        body: dish,
      }),
      invalidatesTags: (result, error, dish) => [
        { type: "Dishes", id: dish.id }, // Invalida el plato específico
        { type: "Dishes", id: dish.categoryId }, // Invalida la categoría, para actualizar los platos de esa categoría
      ],
    }),
    deleteDish: build.mutation<Dish, { dishId: number; categoryId: number }>({
      query: ({ dishId }) => ({
        url: `menu/deletedish/${dishId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { dishId, categoryId }) => [
        { type: "Dishes", id: dishId }, // Invalida el plato específico
        { type: "Dishes", id: categoryId }, // Invalida la categoría para refrescar la lista de platos de esa categoría
      ],
    }),
    createCart: build.mutation<Cart, { sessionId: string }>({
      query: ({ sessionId }) => ({
        url: `order/createcart`,
        method: "POST",
        body: { sessionId },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: build.mutation<Cart, { cartId: number }>({
      query: ({ cartId }) => ({
        url: `order/deletecart/${cartId}`,
        method: "DELETE",
        body: { cartId },
      }),
      invalidatesTags: ["Cart"],
    }),
    getCartBySessionId: build.query<Cart, { sessionId: string }>({
      query: ({ sessionId }) => `order/getcartbysessionid/${sessionId}`,
      providesTags: ["Cart"],
    }),
    createCartItem: build.mutation<CartItem, Partial<CartItem>>({
      query: (cartItem) => ({
        url: `order/createcartitem/${cartItem.id}`,
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItemQuantity: build.mutation<
      CartItem,
      { cartItemId: number; quantity: number }
    >({
      query: ({ cartItemId, quantity }) => ({
        url: `order/updatecartitemquantity/${cartItemId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: build.mutation<CartItem, { cartItemId: number }>({
      query: ({ cartItemId }) => ({
        url: `order/deletecartitem/${cartItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    createOrder: build.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: "order/createorder",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderBySessionId: build.query<Order, { sessionId: string }>({
      query: ({ sessionId }) => `order/getorderbysessionid/${sessionId}`,
      providesTags: ["Order"],
    }),
    getOrderByStatus: build.query<Order, { status: string }>({
      query: ({ status }) => ({
        url: `order/getorderbystatusroomid?status=${encodeURIComponent(
          status
        )}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: build.mutation<
      Order,
      { orderId: number; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `order/updateorderstatus/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderRemainingTime: build.mutation<Order, { orderId: number }>({
      query: ({ orderId }) => ({
        url: `order/updateorderremainingtime/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    updateWaitTime: build.mutation<
      TimeConfiguration,
      Partial<TimeConfiguration>
    >({
      query: (timeConfiguration) => ({
        url: `order/updatewaittime`,
        method: "PATCH",
        body: timeConfiguration,
      }),
    }),
    getWaitTime: build.query<TimeConfiguration, void>({
      query: () => ({
        url: `order/getwaittime/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMenuByTypeQuery,
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetDishesByCategoryQuery,
  useCreateDishMutation,
  useUpdateDishMutation,
  useDeleteDishMutation,
  useCreateCartMutation,
  useGetCartBySessionIdQuery,
  useCreateCartItemMutation,
  useUpdateCartItemQuantityMutation,
  useDeleteCartItemMutation,
  useCreateOrderMutation,
  useDeleteCartMutation,
  useGetOrderBySessionIdQuery,
  useGetOrderByStatusQuery,
  useUpdateOrderStatusMutation,
  useUpdateWaitTimeMutation,
  useGetWaitTimeQuery,
  useUpdateOrderRemainingTimeMutation,
} = api;
