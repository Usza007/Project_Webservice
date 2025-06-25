# Affiliate Insurance Platform

ระบบ Affiliate สำหรับแนะนำประกันภัย พร้อมการเก็บข้อมูลการคลิกและแสดงผลผ่านแดชบอร์ด

## Project Structure

```
affiliate-insurance/
│
├── frontend/               # React-based frontend (with Keycloak & Dashboard)
│
└── affiliate-insurance-api/  # Go backend API server (Gin, JWT, PostgreSQL)
```

---

## Frontend Setup (React)

### 1. สร้างโปรเจกต์ React

```bash
npx create-react-app frontend
```

### 2. นำโฟลเดอร์ `src/` ที่อัปโหลดไว้มา **แทนที่** `frontend/src/` ของโปรเจกต์

> ลบ src เดิม และคัดลอก src ใหม่เข้าไปแทน

### 3. ติดตั้ง dependencies

```bash
cd frontend
npm install
```

### 4. ติดตั้ง libraries เพิ่มเติม

```bash
npm install @react-keycloak/web@3.4.0
npm install chart.js@4.4.8
npm install react-chartjs-2@5.3.0
npm install react-responsive-carousel@3.2.23
npm install react-router-dom@7.5.0
npm install recharts@2.15.3
```

### 5. รัน frontend

```bash
npm start
```

---

## 🛠️ Backend Setup (Go)

### 1. เริ่มต้น Go Module

```bash
go mod init affiliate-insurance-api
```

### 2. ติดตั้ง dependencies

```bash
go get github.com/gin-gonic/gin
go get github.com/golang-jwt/jwt/v5
go get github.com/lib/pq
go get github.com/google/uuid
go get github.com/joho/godotenv
go get github.com/gin-contrib/cors
```

### 3. จัดระเบียบ dependencies

```bash
go mod tidy
```

### 4. รัน Backend

```bash
go run main.go
```

> หมายเหตุ: ไม่ใช้ Docker ในขั้นตอนนี้ เนื่องจากมีปัญหาการทำงานกับ container

---

## Authentication

ระบบใช้ Keycloak สำหรับการยืนยันตัวตนผ่าน JWT Token

- ฝั่ง Frontend ใช้ `@react-keycloak/web`
- ฝั่ง Backend ตรวจสอบ `Authorization: Bearer <token>` เพื่อยืนยันผู้ใช้งาน

---

## Dashboard Feature

- แสดงสถิติจำนวนคลิกที่เกิดขึ้นผ่านลิงก์ Affiliate
- แสดงรายการประกันที่แนะนำ
- รองรับการกรองและแสดงผลด้วยกราฟ

---

## ผู้พัฒนา

> พัฒนาเพื่อโปรเจกต์วิชา Web Service Management — ระบบ Affiliate แนะนำประกันภัย

---

