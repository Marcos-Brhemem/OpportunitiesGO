package router

import (
	"github.com/Marcos-Brhemem/OpportunitiesGO/docs"
	"github.com/Marcos-Brhemem/OpportunitiesGO/handler"
	"github.com/gin-contrib/cors" // Importa o middleware de CORS
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func InitializeRoutes(router *gin.Engine) {
	// Configura o CORS
	corsMiddleware := cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Permite o React na porta 3000
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Aplica o middleware de CORS a todas as rotas
	router.Use(corsMiddleware)

	// Inicializa os handlers
	handler.InitializeHandler()

	// Define o caminho base da API
	basePath := "/api/v1"
	docs.SwaggerInfo.BasePath = basePath

	// Cria o grupo de rotas v1
	v1 := router.Group(basePath)
	{
		v1.POST("/opening", handler.CreateOpeningHandler)
		v1.GET("/opening", handler.ShowOpeningHandler)
		v1.DELETE("/opening", handler.DeleteOpeningHandler)
		v1.PUT("/opening", handler.UpdateOpeningHandler)
		v1.GET("/openings", handler.ListOpeningHandler)
	}

	// Inicializa o Swagger
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
}
