# Ohjeet

## Localhost

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

`npm install pm2 -g`

`pm2 startup systemd`

`npm install pm2 -g`

`pm2 startup systemd`

Lisää config.js sijaintiin tehtavalistaFront/src/config

Kirjoita config.js sisään:

```
export const url = "https://sinun_domain"
```

Avaa sijainti /tehtavalistaFront

suorita build:

`npm build`

Siirrä /build sisällä olevat tiedostot ubuntu serverille sijaintiin:

`var/www/sinun_domain/html/*tänne*`

Siirrä /tehtavaLista ubuntu serverille sijaintiin:

`ubuntu_kayttajanimi/tehtavaLista`
