cp .env.example .env
npx prisma migrate deploy
npx prisma generate
npx prisma db seed
npx nest start