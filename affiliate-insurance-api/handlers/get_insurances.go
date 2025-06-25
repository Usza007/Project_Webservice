package handlers

import (
	"net/http"
	"affiliate-insurance-api/database"
	"affiliate-insurance-api/models"
	"github.com/gin-gonic/gin"
)

func GetInsurances(c *gin.Context) {
	rows, err := database.DB.Query("SELECT id, name, company, category, price, detail_url FROM insurances")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Query failed"})
		return
	}
	defer rows.Close()

	var insurances []models.Insurance
	for rows.Next() {
		var ins models.Insurance
		if err := rows.Scan(&ins.ID, &ins.Name, &ins.Company, &ins.Category, &ins.Price, &ins.DetailURL); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Row scan failed"})
			return
		}
		insurances = append(insurances, ins)
	}

	c.JSON(http.StatusOK, insurances)
}
