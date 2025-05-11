# Transjakarta Armada Management App

Aplikasi ini adalah sistem manajemen armada yang menampilkan data kendaraan secara real-time. Dibangun menggunakan React + TypeScript dengan TailwindCSS, aplikasi ini mendukung fitur filter data, detail kendaraan, dan pagination.

## Cara Menjalankan Aplikasi

1. **Clone Repository**

   ```bash
   git clone https://github.com/istihsan/transjakarta-armada.git
   cd transjakarta-armada
   ```

2. **Install Dependency**

   ```bash
   npm install
   ```

3. **Jalankan Aplikasi**
   ```bash
   npm start
   ```
   Aplikasi akan berjalan di `http://localhost:3000` (atau sesuai port).

## Arsitektur Aplikasi

Aplikasi ini memiliki struktur komponen yang modular dan terpisah berdasarkan tanggung jawabnya:

- **`App.tsx`**  
  Komponen utama yang mengatur alur data dan menampilkan UI utama. Di sini dilakukan fetching data, pengaturan state filter, pagination, dan modal detail kendaraan.

- **`components/VehicleCard.tsx`**  
  Menampilkan kartu untuk tiap kendaraan dengan informasi ringkas.

- **`components/VehicleDetailModal.tsx`**  
  Modal yang muncul ketika pengguna memilih kendaraan, menampilkan detail lengkap sampai dengan lokasi armada terpilih.

- **`components/Filter.tsx`**  
  Komponen filter menggunakan AsyncSelect untuk menyaring data berdasarkan `route_id` dan `trip_id`.

- **`components/Pagination.tsx`**  
  Mengelola pembagian data berdasarkan jumlah per halaman dan navigasi halaman.

- **`types/Vehicle.ts`**  
  Berisi definisi tipe data kendaraan untuk TypeScript.

## API

Data kendaraan diambil dari API MBTA (Massachusetts Bay Transportation Authority):

```
https://api-v3.mbta.com/vehicles
```

## Teknologi

- React + TypeScript
- TailwindCSS
- React Select (Async)
- Fetch API
- Leaflet (Map Support)
