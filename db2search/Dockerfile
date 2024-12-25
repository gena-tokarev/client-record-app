FROM golang:1.23

WORKDIR /app

COPY . .

RUN go mod download

RUN go install github.com/air-verse/air@v1.61.5

RUN go mod tidy
