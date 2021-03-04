# ---- BASE ----
FROM node:12.16.2-alpine3.10 AS base
WORKDIR /app

# ---- DEPENDENCIES ----
FROM base AS dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN apk add --update --no-cache git  && git config --global http.postBuffer 524288000
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
RUN apk add --update --no-cache git  && git config --global http.postBuffer 524288000
RUN yarn install
COPY --from=build /app ./
