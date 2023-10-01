FROM node:18.18.0 as build

WORKDIR /app
COPY  package.json package-lock.json ./

RUN npm install --omit=dev \
    --strict-peer-deps --loglevel verbose && \
    rm -rf /root/.cache && rm -rf /root/.npm
COPY . /app

FROM node:18.18.0-slim as execution
WORKDIR /app
COPY --from=build /app /app

CMD ["npx", "ts-node", "app.ts"]