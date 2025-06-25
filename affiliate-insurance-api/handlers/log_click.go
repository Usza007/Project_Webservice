package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"affiliate-insurance-api/database"
	"affiliate-insurance-api/models"
	"log"
)

func LogClick(c *gin.Context) {
	var input models.ClickLog
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	keycloakIDVal, exists := c.Get("affiliatorID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No affiliator ID from token"})
		return
	}
	keycloakID := keycloakIDVal.(string)

	// 🔍 แปลง keycloak_id → affiliator.id (UUID)
	var affiliatorUUID string
	err := database.DB.QueryRow(
		"SELECT id FROM affiliators WHERE keycloak_id = $1",
		keycloakID,
	).Scan(&affiliatorUUID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Affiliator not found"})
		return
	}

	// ✅ บันทึก log
	query := `INSERT INTO click_logs (affiliator_id, website_url, insurance_id) VALUES ($1, $2, $3)`
	_, err = database.DB.Exec(query, affiliatorUUID, input.WebsiteURL, input.InsuranceID)
	if err != nil {
		log.Println("❌ Failed to insert click log:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "click logged"})
}
