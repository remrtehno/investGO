# ---- BASE ----
FROM node:12.16.2-alpine3.10 AS base
WORKDIR /app

# ---- DEPENDENCIES ----
FROM base AS dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# ---- BUILD ----
FROM dependencies AS build
WORKDIR /app
COPY . /app
RUN yarn build

# --- RELEASE ----
FROM node:12.16.2-alpine3.10 AS release
WORKDIR /app
COPY --from=dependencies /app/package.json ./
RUN yarn install
COPY --from=build /app ./
