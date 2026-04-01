'use server';

import { updateOrder, UpdateOrderInput } from "../service/update-order";

export async function updateOrderAction(input: UpdateOrderInput) {
    return updateOrder(input);
}