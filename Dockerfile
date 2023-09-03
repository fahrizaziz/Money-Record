# Gunakan image Node.js sebagai base image
FROM node:18

# Buat direktori kerja dalam container
WORKDIR /app

# Salin package.json dan yarn.lock ke direktori kerja
COPY package.json yarn.lock /app/

# Install dependencies menggunakan Yarn
RUN yarn install

# Salin semua file proyek ke direktori kerja
COPY . /app/

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["yarn", "start:dev"]