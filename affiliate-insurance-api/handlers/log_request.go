package handlers

import (
	"encoding/json"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"affiliate-insurance-api/database"
)

func LogRequest(c *gin.Context, _, websiteURL string) {
	affiliatorIDVal, exists := c.Get("affiliatorID")
	if !exists {
		c.JSON(400, gin.H{"error": "Affiliator ID not found"})
		return
	}

	keycloakID, ok := affiliatorIDVal.(string) // JWT sub
	if !ok {
		c.JSON(400, gin.H{"error": "Invalid Affiliator ID type"})
		return
	}

	// 🔍 ดึง UUID ที่แท้จริงจากตาราง affiliators
	var affiliatorUUID string
	err := database.DB.QueryRow(
		`SELECT id FROM affiliators WHERE keycloak_id = $1`,
		keycloakID,
	).Scan(&affiliatorUUID)

	if err != nil {
		log.Println("❌ Failed to map keycloak_id:", keycloakID)
		c.JSON(500, gin.H{"error": "Affiliator not found in database"})
		return
	}

	// ✅ แปลง query param เป็น JSONB
	rawQueryParams := c.Request.URL.Query()
	paramsJSON, err := json.Marshal(rawQueryParams)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to encode query parameters"})
		return
	}

	id := uuid.New().String()

	query := `INSERT INTO request_logs (id, affiliator_id, endpoint, method, website_url, query_params, requested_at)
	          VALUES ($1, $2, $3, $4, $5, $6, NOW())`

	_, err = database.DB.Exec(
		query,
		id,
		affiliatorUUID, // ✅ ใส่ UUID ที่ถูกต้องจาก affiliators.id
		c.Request.URL.Path,
		c.Request.Method,
		websiteURL,
		paramsJSON,
	)

	if err != nil {
		log.Println("❌ Failed to insert request log:", err)
		c.JSON(500, gin.H{"error": "Failed to insert request log"})
		return
	}
}
