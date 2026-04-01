'use server';

import { createOrder, CreateOrderInput } from "../service/create-order";

export async function createOrderAction(input: CreateOrderInput) {
    return createOrder(input);
}