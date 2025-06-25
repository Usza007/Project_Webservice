// Frontend
1. ให้ create react ใหม่ โดยใช้คำสั่ง npx create-react-app frontend
2. หลังจากสร้าง poject frontend แล้ว ให้นำโฟเดอร์ src ที่อัปโหลดไว้ให้ มา replace แทนที่ default src ที่ติดมากับ project frontend
3. ใช้คำสั่ง npm install
4. ติดตั้ง library ฝั่ง front end 
    npm install @react-keycloak/web@3.4.0
    npm install chart.js@4.4.8
    npm install react-chartjs-2@5.3.0
    npm install react-responsive-carousel@3.2.23
    npm install react-router-dom@7.5.0
    npm install recharts@2.15.3

//Backend
1.ใช้คำสั่ง go mod init affiliate-insurance-api
2.ติดตั้ง go module ดังนี้
  go get github.com/gin-gonic/gin
  go get github.com/golang-jwt/jwt/v5
  go get github.com/lib/pq
  go get github.com/google/uuid
  go get github.com/joho/godotenv
  go get go get github.com/gin-contrib/cors

3.หลังจากติดตั้ง go module เสร็จ ให้ใช้คำสั่ง go mod tidy

** หมายเหตุ **
วิธี run program ฝั่ง backend ให้ใช้คำสั่ง go run main.go เนื่องจาก docker มีการทำงานขัดข้อง
    
