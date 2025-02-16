FROM node:18.13.0-bullseye AS build
ENV TZ Asia/Tokyo
ENV NODE_ENV development

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init sqlite3
RUN npm install -g pnpm
RUN mkdir /app
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.node.json tsconfig.build.json vite.config.ts index.html .npmrc /app/
COPY databases/ /app/databases/
COPY public/ /app/public/
COPY tools/ /app/tools/
COPY src/ /app/src/
RUN pnpm install --frozen-lockfile
RUN pnpm build:tsc

########################################################################

FROM node:18.13.0-bullseye-slim
ENV TZ Asia/Tokyo
ENV NODE_ENV production

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build /usr/bin/sqlite3 /usr/bin/sqlite3
COPY --from=build --chown=node:node /app /app
WORKDIR /app
USER node
CMD ["dumb-init", "node", "./dist/server/server"]
