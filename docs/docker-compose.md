# Using Docker Compose

Passing full configuration object:

```yaml
version: '2'
services:
  frontend:
    build: ../Dockerfile
    ports:
      - '80:80'
    environment:
      # The configuration file will be overwritten with this JSON value:
      - 'RPC_CONFIG={"servers": [{"title": "Basement Pi","url": "https://pi-basement.rusty.green","pinLabels": {"11": "Cows water","17": "Cows water drain","13": "Chickens water","31": "Chickens water drain"}}]}'
```

Passing server only:

```yaml
version: '2'
services:
  frontend:
    build: ../Dockerfile
    ports:
      - '80:80'
    environment:
      # The configuration will consist of one server with URL/title:
      - 'RPC_SERVER=https://pi-basement.rusty.green'
      - 'RPC_SERVER_TITLE=https://pi-basement.rusty.green'
```
