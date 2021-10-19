# Ohjeet

## Localhostilla suoritus

Avaa sijainti /tehtavaLista

Kaynnista backend:

`npm start`

Avaa sijainti /tehtavalistaFront

Lisää config.js sijaintiin tehtavalistaFront/src/config

Kirjoita config.js sisään:

```
export const url = "http://localhost:3001"
```

avaa sijainti tehtavalistaFront

käynnistä sovellus:

`npm start`

# Virtuaaliserveri Ubuntu Linux (esim Digitalocean)

## Nginx asennus ja palomuurin konfigurointi

`sudo apt update`

`sudo apt install nginx`

`sudo systemctl start nginx`

`systemctl status nginx`

`sudo ufw allow 'Nginx HTTP'`

`sudo mkdir -p /var/www/sinun_domain/html`

`ln -s /etc/nginx/sites-available/sinun_domain /etc/nginx/sites-enabled/`

`nano /etc/nginx/nginx.conf`

Muokkaa ngingx config server_names_hash_bucket_size kohta seuraavaksi:

```
 /etc/nginx/nginx.conf

...
  http {
    ...
      server_names_hash_bucket_size 64;
    ...
  }
...
```

## PM2 asennus

`npm install pm2 -g`

`pm2 startup systemd`

## Front toimintakuntoon

Lisää config.js sijaintiin tehtavalistaFront/src/config

Kirjoita config.js sisään:

```
export const url = "https://sinun_domain"
```

Avaa sijainti /tehtavalistaFront

suorita build:

`npm build`

## Siirto ja käynnistys serverillä

Siirrä /build sisällä olevat tiedostot ubuntu serverille sijaintiin:

`var/www/sinun_domain/html`

Siirrä /tehtavaLista ubuntu serverille sijaintiin:

`ubuntu_kayttajanimi/tehtavaLista`

Luo sinun_domain:

`cd /etc/nginx/sites-available`
`nano sinun-domain`

kirjoita seuraava tiedostoon:

```
server {

  root /var/www/sinun_domain
  index index.html index.htm index.nginx-debian.html

  listen       80;
  server_name  localhost;

  location / {
    proxy_pass http://localhost:sinun_port;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```
