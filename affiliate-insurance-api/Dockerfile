FROM golang:1.23.1-alpine

WORKDIR /app

# Copy ก่อน: go.mod + go.sum
COPY go.mod ./
COPY go.sum ./

# โหลด dependencies
RUN go mod download

# Copy ส่วนที่เหลือทั้งหมด
COPY . .

RUN go build -o main .

EXPOSE 8080

CMD ["./main"]
