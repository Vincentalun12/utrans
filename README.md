<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://media.discordapp.net/attachments/1150374149236195388/1187767255354843226/Utrans2.png?ex=65981575&is=6585a075&hm=cf0bf1945abf9808fd7467cc4bfbba681c238c505831df9e7a4dcbd0e7381556&=&format=webp&quality=lossless&width=1087&height=249" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# 📦 Apa itu Utrans?

Utrans, website ERP yang dirancang khusus untuk membantu bisnis kecil dan menengah dalam mengelola operasional mereka dengan lebih efisien. Utrans menyediakan platform yang user-friendly dan terintegrasi untuk mengatasi berbagai aspek bisnis, mulai dari keuangan hingga manajemen inventaris.

# 🔥 Keunggulan

- 🛡️ Keamanan Data
- 🤳 Multi Platform
- 📈 Akuntansi Lengkap + Bisa disesuaikan
- 🖨️ Ekspor Data & Print
- ✨ Mudah Digunakan
- 🌏 Mendukung 2 Bahasa (Inggris & Indonesia)
- 📱 Dashboard Intuitif


# 📸 Preview (Batam Water version)

![Screenshot 1](https://media.discordapp.net/attachments/1150374149236195388/1187799656139329628/image.png)

![Screenshot 2](https://media.discordapp.net/attachments/1150374149236195388/1187796961194147930/image.png)

![Screenshot 3](https://media.discordapp.net/attachments/1150374149236195388/1187799291939520542/image.png)

![Balance Sheet Screenshot](https://media.discordapp.net/attachments/1150374149236195388/1188186947466842182/image.png)


## 🧶 Komponen yang dibutuhkan

💻 Sistem ini dirancang dengan komposisi 80% React (JavaScript) dan 20% PHP

- PHP 8.2.0 atau terbaru [(https://www.php.net/downloads.php)](https://www.php.net/downloads.php)
- Git - Agar dapar clone project ini [(https://git-scm.com/downloads)](https://git-scm.com/downloads) - **atau** [GitHub Desktop](https://desktop.github.com/)
- Localhost Software seperti [XAMPP](https://www.apachefriends.org/download.html) atau [Laragon](https://laragon.org/download/index.html) (Direkomendasikan [Laragon](https://laragon.org/download/index.html) karena kami menggunakannya) 
- Node.js (v18.18.0+) [(https://nodejs.org/en)](https://nodejs.org/en)
- Composer (v2.5.4+) [(https://getcomposer.org/download/)](https://getcomposer.org/download/)
- Code Editor (Direkomendasikan: [Visual Studio Code](https://code.visualstudio.com/download))

## 🪛 Petunjuk Instalasi

#### ⚠️ Sebelum memulai, pastikan database MySQL & Apache sudah terinstall dan dijalankan. ⚠️

#### 1. Jalankan aplikasi localhost (XAMPP, Laragon, dsb). Sesuaikan port database yaitu 3306 dan localhost secara default.
#### 2. Pergi ke directory yang diinginkan untuk menyimpan project ini.
#### 3. Ketika sudah berada di folder yang di inginkan, jalankan command dibawah ini:
```http
git clone https://github.com/Vincentalun12/utrans.git
```
#### 4. Setalah clone berhasil, buka Code Editor dan open folder repository yang telah di clone, lalu buka Terminal.


Jalankan composer install jika composer sudah di download namun belum terinstall.
```http
composer install
```
Jalankan command dibawah ini untuk menginstall composer yang digunakan di repository:
```http
composer update
```

Jalankan 2 command instalasi NPM package untuk menginstall komponen library Javascript yang digunakan di repository:
```http
npm update
```
```http
npm install
```

Jalankan command untuk melakukan database seeding dan migration untuk melakukan instalasi database ke MySQL
```http
php artisan migrate:fresh --seed
```

#### 5. Ketika semua berhasil, jalankan 2 command dibawah ini dengan 2 terminal yang berbeda:

**Terminal 1**
```http
npm run dev
```

**Terminal 2**
```http
php artisan serve
```

Pastikan kedua terminal dijalankan secara bersamaan.

#### 6. Jika semua step dilakukan dengan benar, maka anda sudah berhasil untuk menjalankan projek ini

Untuk mengunjungi website localhost bisa langsung ke URL:
```http
http://127.0.0.1:8000
```

#### 7. Selesai! Anda sudah bisa login dengan username dan password default kami yaitu:

Username: `admin@email.com`

Password: `admin`

## 💎 Kelompok QWER

- [@Vincentalun12](https://github.com/Vincentalun12) - Vincent [Frontend Designer]
- [@jupitvq](https://github.com/jupitvq) - Jupiter - [Frontend & API Programmer]
- [@Hernando17](https://github.com/Hernando17) - Hernando - [Heavy Backend Programmer]
- Jonathan
- Evelyne
