package handlers

import (
	"log"
	"net/http"
	"time"

	"affiliate-insurance-api/database"
	"github.com/gin-gonic/gin"
)

func TrackClick(c *gin.Context) {
	ref := c.Query("ref")
	redirectURL := c.Query("site")
	keycloakID := c.Query("aff") // จริง ๆ คือ keycloak_id
	var affiliatorID string

	err := database.DB.QueryRow(
		`SELECT id FROM affiliators WHERE keycloak_id = $1`,
		keycloakID,
	).Scan(&affiliatorID)

	if err != nil {
		log.Printf("❌ Failed to find affiliator by keycloak_id: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid affiliator"})
		return
	}

	if ref == "" || redirectURL == "" || affiliatorID == "" {
		log.Printf("❌ Missing query: ref=%s, site=%s, aff=%s\n", ref, redirectURL, affiliatorID)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing ref, site or affiliator_id"})
		return
	}

	ip := c.ClientIP()
	userAgent := c.Request.UserAgent()
	clickedAt := time.Now()

	log.Printf("🧪 Logging: ref=%s, aff=%s, ip=%s\n", ref, affiliatorID, ip)

	_, err = database.DB.Exec(
		`INSERT INTO click_logs (insurance_id, website_url, ip_address, user_agent, clicked_at, affiliator_id)
		 VALUES ($1, $2, $3, $4, $5, $6)`,
		ref, redirectURL, ip, userAgent, clickedAt, affiliatorID,
	)
	if err != nil {
		log.Printf("❌ Failed to log click: %v\n", err)
	} else {
		log.Printf("✅ Click logged: ref=%s, affiliator=%s\n", ref, affiliatorID)
	}

	c.Redirect(http.StatusFound, redirectURL)
}
