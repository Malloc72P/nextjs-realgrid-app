# Next.js + PrismaORM + RealGrid 풀스택 데이터 그리드 앱

Next.js, Prisma ORM, RealGrid를 사용하여 만든 풀스택 데이터 그리드 앱입니다.

- **Next.js**: 서버 컴포넌트와 서버 액션으로 풀스택 구현
- **Prisma ORM**: PostgreSQL 연동 및 타입 안전한 CRUD
- **RealGrid**: 고성능 데이터 그리드 (낙관적 업데이트 패턴)

## 실행 방법

### 1. 패키지 설치

```bash
pnpm install
```

### 2. DB 실행 (Docker 필요)

```bash
docker compose up -d
```

### 3. Prisma 마이그레이션 및 클라이언트 생성

```bash
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

`http://localhost:3000`에서 확인할 수 있습니다.

## 기술 스택

| 기술 | 용도 |
|------|------|
| Next.js 16 | 풀스택 프레임워크 (App Router) |
| Prisma ORM | 타입 안전한 DB 접근 |
| PostgreSQL | 데이터베이스 |
| RealGrid | 데이터 그리드 |
| Tailwind CSS | 스타일링 |
| TypeScript | 타입 안전성 |

## 관련 포스트

- [next-grid-app (AG Grid 버전)](https://github.com/Malloc72P/next-grid-app)
