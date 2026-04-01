import prisma from "../lib/prisma";

export interface UpdateOrderInput {
    id: number;
    price?: number;
    qty?: number
}

export async function updateOrder({id, price, qty}: UpdateOrderInput) {
    return prisma.order.update({
        where: { id },
        data: { price, qty }
    });
}