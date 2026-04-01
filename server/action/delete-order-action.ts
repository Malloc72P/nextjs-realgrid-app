'use server';

import { deleteOrder } from "../service/delete-order";

export async function deleteOrderAction(orderId: number) {
    return deleteOrder(orderId);
}