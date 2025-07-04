package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"affiliate-insurance-api/database"
)

func GetAffiliatorWebsites(c *gin.Context) {
	affIDVal, exists := c.Get("affiliatorID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	keycloakID := affIDVal.(string)

	var affiliatorUUID string
	err := database.DB.QueryRow(`SELECT id FROM affiliators WHERE keycloak_id = $1`, keycloakID).Scan(&affiliatorUUID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Affiliator not found"})
		return
	}

	rows, err := database.DB.Query(`
		SELECT id, website_url, created_at 
		FROM affiliator_websites 
		WHERE affiliator_id = $1 AND is_active = TRUE
		ORDER BY created_at DESC
	`, affiliatorUUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Query failed"})
		return
	}
	defer rows.Close()

	var result []map[string]interface{}
	for rows.Next() {
		var id, url string
		var createdAt string
		rows.Scan(&id, &url, &createdAt)

		result = append(result, gin.H{
			"id":          id,
			"website_url": url,
			"created_at":  createdAt,
		})
	}

	c.JSON(http.StatusOK, result)
}
