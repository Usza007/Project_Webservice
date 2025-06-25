package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"affiliate-insurance-api/database"
	"affiliate-insurance-api/models"
	"log"
)

func RegisterWebsite(c *gin.Context) {
	var input models.Website
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ✅ ดึง affiliatorID จาก JWT (keycloak sub)
	keycloakIDVal, exists := c.Get("affiliatorID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No affiliator ID from token"})
		return
	}
	keycloakID := keycloakIDVal.(string)
	log.Println("🔑 Keycloak ID:", keycloakID)

	// ✅ ดึง UUID ที่แท้จริงจากตาราง affiliators
	var affiliatorUUID string
	err := database.DB.QueryRow(
		"SELECT id FROM affiliators WHERE keycloak_id = $1",
		keycloakID,
	).Scan(&affiliatorUUID)
	if err != nil {
		log.Println("❌ Failed to find affiliator UUID:", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Affiliator not found"})
		return
	}

	// ✅ Insert ด้วย UUID ที่ถูกต้อง
	query := `INSERT INTO affiliator_websites (affiliator_id, website_url) VALUES ($1, $2)`
	_, err = database.DB.Exec(query, affiliatorUUID, input.WebsiteURL)
	if err != nil {
		log.Println("❌ Failed to insert website:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "website registered"})
}
