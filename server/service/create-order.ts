import prisma from "../lib/prisma";

export interface CreateOrderInput {
    price: number;
    qty: number;
}

export async function createOrder({price, qty}: CreateOrderInput) {
    const newOrder = await prisma.order.create({
        data: { price, qty }
    });

    return newOrder;
}
