package router

import "github.com/gin-gonic/gin"

func Initialize() {
	// initialize router
	router := gin.Default()

	// initialize routes
	InitializeRoutes(router)
	// start server
	router.Run(":8080")
}
