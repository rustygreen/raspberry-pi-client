# 🥧 Raspberry Pi Client

`raspberry-pi-client` is a decoupled frontend SPA application designed to communicate with the [raspberry-pi-server project](https://github.com/rustygreen/raspberry-pi-server).

## 🏁 Getting Started

There are several ways to run the `raspberry-pi-client` application. You can use [Docker](https://www.docker.com/), build it manually and deploy as a static site, or deploy it through [Kubernetes](https://kubernetes.io/).

### Run with Docker

```bash
docker run -d --restart=unless-stopped -p 80:80 ghcr.io/rustygreen/raspberry-pi-client:main
```

To access the application UI, open a browser and go to the hostname or address where the container was installed.

### Using Docker Compose

docker-compose.yml

```yaml
version: '3'

services:
  raspberry-pi-client:
    container_name: raspberry-pi-client
    image: ghcr.io/rustygreen/raspberry-pi-client:main
    ports:
      - '80:80'
    restart: unless-stopped
```

Then run `docker-compose up -d`

### Run or Build Manually

#### Dependencies

- NodeJS 14+
- Git

#### Clone and install dependencies

```bash
git clone https://github.com/rustygreen/raspberry-pi-client
cd raspberry-pi-client
npm install
```

#### Run in development

```bash
npm run start
# Go to http://localhost:4200
```

#### Build production static site

```bash
npm run build:prod # Build production build
# Deploy: dist/raspberry-pi-client
```

## TODOs

- [x] Add CI/CD
- [ ] Add unit tests
- [ ] Add sample app
- [ ] Finish documentation
