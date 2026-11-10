FROM node:18-bookworm-slim AS frontend
WORKDIR /src/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:18-bookworm-slim
WORKDIR /app
COPY backend/package.json backend/package-lock.json backend/
RUN npm ci --omit=dev --ignore-scripts --prefix backend
COPY backend/ backend/
COPY database/rebuild/ database/rebuild/
COPY docker/entrypoint.js docker/entrypoint.js
COPY --from=frontend /src/frontend/build frontend/build
WORKDIR /app/backend
ENV PORT=3001
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=5 \
  CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3001)+'/api/me',r=>process.exit(r.statusCode===401?0:1)).on('error',()=>process.exit(1))"
CMD ["node", "/app/docker/entrypoint.js"]
