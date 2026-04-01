import prisma from "../lib/prisma";

export async function deleteOrder(id: number) {
    return prisma.order.delete({
        where: { id },
    });
}