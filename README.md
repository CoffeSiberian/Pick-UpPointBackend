# tmp-online-backend

```
PORT=8081
DB_IP=127.0.0.1
DB_PORT=3306
DB_SLL=false
DB_DIALECT=mysql
DB_NAME=backend
DB_USERNAME=root
DB_PASSWORD=123456
SV_USERNAME=username
SV_PASSWORD_HASH=hash
HASH_ROUNDS=5
JWT_ALGORITHM=RS256
JWT_TIMEOUT_TOKEN=1h
JWT_SECRET_PKCS8=SECRET_KEY
JWT_PUBLIC=PUBLIC_KEY
SERVER_CRT_SSL="SSL_CRT"
SERVER_KEY_SSL="SSL_KEY"
```

You can generate new credentials to JWT with the following commands.

```bash
openssl genrsa -out jwt_key 4096
openssl rsa -in jwt_key -pubout -out jwt_key.pub
openssl pkcs8 -topk8 -inform PEM -in jwt_key -outform PEM -nocrypt -out jwt_key_pkcs8.pem
```

You can generate new credentials to SSL with the following commands.

```bash
openssl genpkey -algorithm RSA -out server.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

To start backend using PM2 (need use npm run build first)

```bash
pm2 start /home/user/Pick-UpPointBackend/build/index.js --name Pick-UpPointBackend -u user
```

Being inside the folder so that it takes the .env
