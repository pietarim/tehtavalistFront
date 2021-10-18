## Ohjeet

# Localhost:

lisää config.js sijaintiin /src

lisää config.js sisään:

### export const url = "https://sinun_domain.com"

käynnistä sovellus

### npm start

Sovelluksen backend löytyy [täältä] solluksen backend toimii kun käynnistät sen linkin mukana tulevien ohjeiden mukaan (https://github.com/pietarim/tehtavaLista)

# Virtuaaliserveri Ubuntu Linux Digitalocean

### sudo apt update

### sudo apt install nginx

### sudo systemctl start nginx

### systemctl status nginx

### sudo ufw allow 'Nginx HTTP'

### sudo mkdir -p /var/www/sinun_domain/html

### ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/

### nano /etc/nginx/nginx.conf

| Otsikko |
| ------- |
| teksti  |

### npm install pm2 -g

### pm2 startup systemd
