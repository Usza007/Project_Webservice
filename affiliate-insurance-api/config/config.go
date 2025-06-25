package config

import "os"

type Config struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	ServerPort string
}

func LoadConfig() Config {
	return Config{
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "webservice_user"),
		DBPassword: getEnv("DB_PASSWORD", "your_strong_password"),
		DBName:     getEnv("DB_NAME", "webservice"),
		ServerPort: getEnv("SERVER_PORT", "8080"),
	}
}


func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
