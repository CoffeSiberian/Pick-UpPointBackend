# Pick-UpPointBackend

```
PORT=8081
DB_IP=127.0.0.1
DB_PORT=3306
DB_SLL=false
DB_DIALECT=mysql
DB_NAME=backend
DB_USERNAME=root
DB_PASSWORD=123456
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

## Pending

-   [ ] Listar órdenes de compra de un cliente
-   [ ] Visualizar órdenes de compra (sus datos y los productos adquiridos)
-   [ ] Habilitar paginación en todos los componentes necesarios de UI
-   [ ] Mejorar el aspecto del carrito de compra
-   [ ] Al editar un usuario, si la contraseña no es asignada, esta no debe ser modificada
-   [ ] Mejorar la generación de código QR (necesita márgenes blancos para facilitar su lectura por la cámara)
-   [ ] Habilitar la posibilidad de subir imágenes para los productos creados
-   [ ] Mostrar imágenes de los productos al visualizarlos en la web
-   [ ] Al ingresar el RUT, el usuario podría estar registrado en otra tienda y podría generar conflicto por las IDs únicas de RUT (se necesita mejorar)
-   [ ] Habilitar estadísticas de forma dinámica según los datos generados por el comercio
-   [ ] Poder modificar las credenciales de FLOW.CL desde la tienda y la UI de esta
-   [ ] Habilitar panel de usuario con opciones básicas (lista de pedidos y modificar parámetros de su cuenta)
