# Ohjeet

## Localhost:

Avaa sijainti "tehtavaLista"

Kaynnista backend:

`npm start`

Lisää config.js sijaintiin tehtavalistaFront/src/config

Kirjoita config.js sisään:

```
export const url = "http://localhost:3001"
```

avaa sijainti tehtavalistaFront

käynnistä sovellus:

`npm start`

Sovelluksen backend löytyy [täältä] solluksen backend toimii kun käynnistät sen linkin mukana tulevien ohjeiden mukaan (https://github.com/pietarim/tehtavaLista)

## Virtuaaliserveri Ubuntu Linux (esim Digitalocean)

`sudo apt update`

`sudo apt install nginx`

`sudo systemctl start nginx`

`systemctl status nginx`

`sudo ufw allow 'Nginx HTTP'`

`sudo mkdir -p /var/www/sinun_domain/html`

`ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/`

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
