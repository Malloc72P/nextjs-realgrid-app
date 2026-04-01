import prisma from "../lib/prisma";

export async function getOrders() {
    return prisma.order.findMany();
}