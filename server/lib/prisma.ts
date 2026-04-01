import { PrismaClient } from "../../app/generated/prisma/client"; 
import { PrismaPg } from "@prisma/adapter-pg"; 

const globalForPrisma = global as unknown as {
  prisma: PrismaClient; 
}; 

// Postgres Adapter 객체 생성 및 PrismaClient에 적용
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL }); 
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

// next 개발모드에선 모듈 핫 리로드(HMR)시 모듈이 재실행되므로, 아래와 같이 설정하여 이전에 생성한 클라이언트를 재사용한다.
// 이렇게 안하면 모듈 재실행될 때 마다 새 커넥션을 생성하여, 커넥션이 고갈된다.
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma; 
}

export default prisma;
