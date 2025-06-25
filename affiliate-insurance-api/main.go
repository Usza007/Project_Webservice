// main.go
package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/gin-contrib/cors"


	"affiliate-insurance-api/config"
	"affiliate-insurance-api/database"
	"affiliate-insurance-api/routes"
)

func main() {
	_ = godotenv.Load()
	cfg := config.LoadConfig()
	database.ConnectDB(cfg)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		// เพิ่ม cloudflare domain ที่ต้องการอนุญาต https://-coverage-winners-evaluations.trycloudflare.com
		AllowOrigins:     []string{"http://localhost:3000","https://-coverage-winners-evaluations.trycloudflare.com"},
		// เพิ่ม header ที่ต้องการอนุญาต OPTIONS
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	  }))
	routes.SetupRoutes(r)

	r.Run("0.0.0.0:" + cfg.ServerPort)
}