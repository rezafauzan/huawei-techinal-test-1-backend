# Huawei Backend Express REST API Technical Test 

Backend REST API sederhana menggunakan **Node.js** dan **Express.js** untuk kebutuhan technical test Huawei. Project ini menyediakan API manajemen user, dokumentasi Swagger, middleware logging, CORS handling, serta dukungan Docker dan GitHub Actions untuk build image ke GitHub Container Registry.

## Daftar Isi

- [Huawei Backend Express REST API Technical Test](#huawei-backend-express-rest-api-technical-test)
  - [Daftar Isi](#daftar-isi)
  - [Tentang Project](#tentang-project)
  - [Fitur](#fitur)
  - [Tech Stack](#tech-stack)
  - [Struktur Folder](#struktur-folder)
  - [Prasyarat](#prasyarat)
  - [Instalasi](#instalasi)
  - [Konfigurasi Environment](#konfigurasi-environment)
  - [Menjalankan Project](#menjalankan-project)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [Menjalankan dengan Docker](#menjalankan-dengan-docker)
    - [Build Docker Image](#build-docker-image)
    - [Run Container](#run-container)
  - [Dokumentasi API](#dokumentasi-api)
  - [Endpoint API](#endpoint-api)
    - [Health Check](#health-check)
    - [Get All Users](#get-all-users)
    - [Create User](#create-user)
    - [Update User](#update-user)
    - [Delete User](#delete-user)
  - [Format Response](#format-response)
  - [Validasi Data](#validasi-data)
    - [Create User](#create-user-1)
    - [Update User](#update-user-1)
  - [Contoh Request](#contoh-request)
    - [Create User dengan cURL](#create-user-dengan-curl)
    - [Get All Users](#get-all-users-1)
    - [Update User](#update-user-2)
    - [Delete User](#delete-user-1)
  - [Testing Manual](#testing-manual)
  - [Logging](#logging)
  - [CI/CD](#cicd)
  - [Catatan Teknis](#catatan-teknis)
  - [Troubleshooting](#troubleshooting)
    - [Port sudah digunakan](#port-sudah-digunakan)
    - [Swagger tidak muncul](#swagger-tidak-muncul)
    - [CORS error](#cors-error)
    - [Data user hilang setelah restart](#data-user-hilang-setelah-restart)
  - [Roadmap Pengembangan](#roadmap-pengembangan)
  - [Author](#author)

## Tentang Project

Project ini adalah backend API berbasis Express.js untuk mengelola data user. Data user disimpan sementara di memory menggunakan array JavaScript, sehingga cocok untuk demo, technical test, atau pembelajaran arsitektur backend sederhana.

Aplikasi menyediakan endpoint untuk:

- Health check server
- Melihat semua user
- Membuat user baru
- Mengubah data user
- Menghapus user
- Melihat dokumentasi API melalui Swagger UI

## Fitur

- REST API menggunakan Express.js
- ES Module JavaScript
- CRUD user sederhana
- Validasi request body
- Response JSON konsisten
- Swagger UI untuk dokumentasi API
- Middleware logging request
- Middleware CORS
- Log file harian di folder `logs`
- Konfigurasi environment melalui `.env`
- Docker multi-stage build
- GitHub Actions untuk build dan push Docker image ke GHCR

## Tech Stack

- Node.js
- Express.js
- Swagger JSDoc
- Swagger UI Express
- Docker
- GitHub Actions
- GitHub Container Registry

## Struktur Folder

```txt
interview-huawei/
├── .github/
│   └── workflows/
│       └── integration-development.yml
├── src/
│   ├── controllers/
│   │   └── users.controller.js
│   ├── lib/
│   │   ├── http_handlers.js
│   │   └── logger.js
│   ├── middleware/
│   │   ├── cors.middleware.js
│   │   └── log.middleware.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   ├── docs.router.js
│   │   └── users.router.js
│   └── main.js
├── storage/
│   └── data.js
├── test/
│   └── user.http
├── .env.example
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
````

## Prasyarat

Pastikan sudah menginstall:

* Node.js versi 20 atau lebih baru
* npm
* Docker, opsional untuk menjalankan via container
* REST Client extension, opsional untuk menjalankan file `test/user.http`

> Project Docker menggunakan base image `node:24-alpine`, sehingga disarankan menggunakan Node.js versi modern.

## Instalasi

Clone repository:

```bash
git clone https://github.com/rezafauzan/interview-huawei.git
cd interview-huawei
```

Install dependency:

```bash
npm install
```

Buat file `.env` dari contoh environment:

```bash
cp .env.example .env
```

## Konfigurasi Environment

Contoh isi `.env`:

```env
APP_ENV=production
DEBUG=false
PORT=8888
FRONTEND_URL=http://example.com
```

Penjelasan:

| Variable       | Deskripsi                                                                  | Contoh                       |
| -------------- | -------------------------------------------------------------------------- | ---------------------------- |
| `APP_ENV`      | Environment aplikasi. Jika `development`, CORS akan membuka origin ke `*`. | `development` / `production` |
| `DEBUG`        | Mengatur apakah log juga ditampilkan ke console.                           | `true` / `false`             |
| `PORT`         | Port aplikasi.                                                             | `8888`                       |
| `FRONTEND_URL` | Origin frontend yang diizinkan saat production.                            | `http://localhost:3000`      |

## Menjalankan Project

### Development Mode

```bash
npm run dev
```

Script ini menjalankan server menggunakan:

```bash
node --watch --env-file=.env src/main.js
```

Server akan berjalan di:

```txt
http://localhost:8888
```

### Production Mode

```bash
npm start
```

Script ini menjalankan:

```bash
node src/main.js
```

> Pastikan environment variable sudah tersedia saat menjalankan mode production.

## Menjalankan dengan Docker

### Build Docker Image

```bash
docker build -t huawei-backend-technical-test .
```

### Run Container

```bash
docker run -p 8888:8888 --env-file .env huawei-backend-technical-test
```

Aplikasi dapat diakses melalui:

```txt
http://localhost:8888
```

## Dokumentasi API

Swagger UI tersedia di endpoint:

```txt
GET /docs
```

Buka di browser:

```txt
http://localhost:8888/docs
```

## Endpoint API

### Health Check

```http
GET /
```

Response sukses:

```json
{
  "success": true,
  "message": "Backend is running well",
  "result": [],
  "links": null
}
```

### Get All Users

```http
GET /users
```

Response sukses:

```json
{
  "success": true,
  "message": "Get all users data",
  "result": [
    {
      "id": 0,
      "first_name": "Reza",
      "last_name": "Fauzan",
      "email": "reza@example.com",
      "address": "Jakarta Selatan",
      "phone": "081234567890"
    }
  ],
  "links": null
}
```

### Create User

```http
POST /users
Content-Type: application/json
```

Request body:

```json
{
  "first_name": "Reza",
  "last_name": "Fauzan",
  "email": "reza@example.com",
  "address": "Jakarta Selatan",
  "phone": "081234567890",
  "password": "password123",
  "confirm_password": "password123"
}
```

Response sukses:

```json
{
  "success": true,
  "message": "Create user success!",
  "result": {
    "id": 0,
    "first_name": "Reza",
    "last_name": "Fauzan",
    "email": "reza@example.com",
    "address": "Jakarta Selatan",
    "phone": "081234567890"
  },
  "links": null
}
```

### Update User

```http
PATCH /users/:id
Content-Type: application/json
```

Contoh:

```http
PATCH /users/0
Content-Type: application/json
```

Request body:

```json
{
  "first_name": "Reza Update",
  "last_name": "Fauzan Update",
  "email": "reza.update@example.com",
  "address": "Bandung, Indonesia",
  "phone": "081234567890"
}
```

Response sukses:

```json
{
  "success": true,
  "message": "Update user success!",
  "result": {
    "id": 0,
    "first_name": "Reza Update",
    "last_name": "Fauzan Update",
    "email": "reza.update@example.com",
    "address": "Bandung, Indonesia",
    "phone": "081234567890"
  },
  "links": null
}
```

### Delete User

```http
DELETE /users/:id
```

Contoh:

```http
DELETE /users/0
```

Response sukses:

```json
{
  "success": true,
  "message": "Delete user success!",
  "result": {
    "id": 0,
    "first_name": "Reza",
    "last_name": "Fauzan",
    "email": "reza@example.com",
    "address": "Jakarta Selatan",
    "phone": "081234567890"
  },
  "links": null
}
```

## Format Response

Semua response API menggunakan format umum berikut:

```json
{
  "success": true,
  "message": "Message",
  "result": {},
  "links": null
}
```

Response error:

```json
{
  "success": false,
  "message": "Error message",
  "result": null,
  "links": null
}
```

## Validasi Data

### Create User

Field yang wajib dikirim:

| Field              | Rule                                |
| ------------------ | ----------------------------------- |
| `first_name`       | Wajib, minimal 4 karakter           |
| `last_name`        | Wajib, minimal 4 karakter           |
| `address`          | Wajib, minimal 10 karakter          |
| `phone`            | Wajib, minimal 10 digit/karakter    |
| `email`            | Wajib, harus mengandung `@`         |
| `password`         | Wajib, minimal 8 karakter           |
| `confirm_password` | Wajib, harus sama dengan `password` |

### Update User

Field yang wajib dikirim:

| Field        | Rule                             |
| ------------ | -------------------------------- |
| `first_name` | Wajib, minimal 4 karakter        |
| `last_name`  | Wajib, minimal 4 karakter        |
| `address`    | Wajib, minimal 10 karakter       |
| `phone`      | Wajib, minimal 10 digit/karakter |
| `email`      | Wajib, harus mengandung `@`      |

## Contoh Request

### Create User dengan cURL

```bash
curl -X POST http://localhost:8888/users \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Reza",
    "last_name": "Fauzan",
    "email": "reza@example.com",
    "address": "Jakarta Selatan",
    "phone": "081234567890",
    "password": "password123",
    "confirm_password": "password123"
  }'
```

### Get All Users

```bash
curl http://localhost:8888/users
```

### Update User

```bash
curl -X PATCH http://localhost:8888/users/0 \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Reza Update",
    "last_name": "Fauzan Update",
    "email": "reza.update@example.com",
    "address": "Bandung, Indonesia",
    "phone": "081234567890"
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:8888/users/0
```

## Testing Manual

Project menyediakan file request manual:

```txt
test/user.http
```

File ini dapat dijalankan menggunakan extension REST Client di VS Code atau tools lain yang mendukung format `.http`.

Contoh variable di file tersebut:

```http
@base_url = localhost:8888
@first_name = Reza
@last_name = Fauzan Adhima
@email = reza.fauzan.adhima.04@gmail.com
@address = Jakarta, Indonesia
@phone = +6285183356072
@password = test1111
@confirm_password = test1111
```

Saat ini belum tersedia script automated test seperti:

```bash
npm test
```

## Logging

Aplikasi memiliki sistem logging sederhana yang akan menulis log ke folder:

```txt
logs/
```

Format file log harian:

```txt
YYYY-MM-DD.log
```

Contoh format log:

```txt
[2026-01-01 10:00:00] [INFO] [SYSTEM] Server started on port 8888
```

Jenis log yang tersedia:

* `system`
* `auth`
* `api`
* `warning`
* `error`

Middleware `log.middleware.js` mencatat informasi request seperti method, URL, status code, durasi request, dan IP address.

## CI/CD

Project memiliki workflow GitHub Actions:

```txt
.github/workflows/integration-development.yml
```

Workflow ini berjalan saat ada push ke branch:

```txt
main
```

atau tag dengan format:

```txt
v.*.*.*-*
```

Pipeline melakukan:

1. Checkout source code
2. Setup metadata Docker image
3. Login ke GitHub Container Registry
4. Setup QEMU
5. Setup Docker Buildx
6. Build dan push Docker image

Image dipush ke:

```txt
ghcr.io/rezafauzan/huawei-backend-technical-test
```

## Catatan Teknis

* Data user disimpan di memory melalui `storage/data.js`.
* Data akan hilang ketika server direstart.
* Password saat ini disimpan langsung di memory dan belum di-hash.
* Belum menggunakan database eksternal.
* Belum ada authentication atau authorization.
* Belum ada automated test.
* ID user dibuat berdasarkan panjang array users saat user dibuat.
* Untuk production sungguhan, disarankan menambahkan database, hashing password, validasi schema, testing, dan authentication.

## Troubleshooting

### Port sudah digunakan

Jika muncul error karena port `8888` sudah digunakan, ubah `PORT` di `.env`:

```env
PORT=3000
```

Lalu jalankan ulang:

```bash
npm run dev
```

### Swagger tidak muncul

Pastikan server sudah berjalan, lalu buka:

```txt
http://localhost:8888/docs
```

### CORS error

Periksa nilai berikut di `.env`:

```env
APP_ENV=production
FRONTEND_URL=http://localhost:3000
```

Untuk development, dapat menggunakan:

```env
APP_ENV=development
```

### Data user hilang setelah restart

Hal ini normal karena data masih disimpan di memory. Untuk menyimpan data permanen, gunakan database seperti PostgreSQL, MySQL, MongoDB, atau SQLite.

## Roadmap Pengembangan

Beberapa improvement yang bisa ditambahkan:

* Integrasi database
* Password hashing dengan bcrypt atau argon2
* Authentication menggunakan JWT
* Schema validation menggunakan Zod, Joi, atau express-validator
* Unit test dan integration test
* Error handler middleware global
* Pagination untuk endpoint list user
* Docker Compose
* Environment config yang lebih aman
* Linting dan formatter
* OpenAPI schema yang lebih lengkap

## Author

**Reza Fauzan**

* GitHub: `@rezafauzan`