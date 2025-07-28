FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
# 💡 Fix: Increase memory limit for TypeScript build
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npm run build

#Production Stage

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD [ "node" , "dist/app.js" ]