# Temel image
FROM node:18

# Çalışma dizini
WORKDIR /app

# Paket dosyalarını kopyala ve yükle
COPY package*.json ./
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamayı başlat
CMD ["npm", "start"]

# Dinlenecek port
EXPOSE 3000

