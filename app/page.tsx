import { getOrders } from "@/server/service/get-orders";
import { OrderGrid } from "./order-grid";

export default async function Home() {
  // 서버 컴포넌트이므로 비즈니스 로직 직접 호출 가능.
  const orders = await getOrders();

  return (
    <div>
      <OrderGrid orders={orders}/>
    </div>
  );
}
