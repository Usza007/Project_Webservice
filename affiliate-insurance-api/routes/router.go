package routes

import (
	"github.com/gin-gonic/gin"
	"affiliate-insurance-api/handlers"
	"affiliate-insurance-api/middlewares"
)

func SetupRoutes(r *gin.Engine) {
	r.POST("/register", handlers.RegisterAffiliator)

	r.GET("/track", handlers.TrackClick)
	api := r.Group("/api")
	
	api.Use(
		middlewares.AuthMiddleware(),
		middlewares.LoggerMiddleware(),
		middlewares.RequestLoggerMiddleware(),
	)
	{
		api.GET("/insurances", handlers.GetInsurances)
		api.POST("/logs/click", handlers.LogClick)
		api.POST("/websites", handlers.RegisterWebsite)
		api.GET("/websites", handlers.GetAffiliatorWebsites)
		api.DELETE("/websites/:id", handlers.DeleteWebsite)
		api.GET("/dashboard/click-summary", handlers.GetClickSummary)
	}
}
