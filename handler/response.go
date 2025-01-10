package handler

import (
	"net/http"

	"github.com/Marcos-Brhemem/OpportunitiesGO/schemas"
	"github.com/gin-gonic/gin"
)

func SendError(ctx *gin.Context, code int, msg string) {
	ctx.Header("Content-type", "application/json")
	ctx.JSON(code, gin.H{
		"message":   msg,
		"errorCode": code,
	})
}

func SendSucess(ctx *gin.Context, op string, data interface{}) {
	ctx.Header("Context-type", "applicatiion/json")
	ctx.JSON(http.StatusOK, gin.H{
		"message": op,
		"data":    data,
	})
}

type ErrorResponse struct {
	Message   string `json:"message"`
	ErrorCode string `json:"errorCode"`
}

type CreateOpeningResponse struct {
	Message string                  `json:"message"`
	Data    schemas.OpeningResponse `json:"data"`
}

type DeleteOpeningResponse struct {
	Message string                  `json:"message"`
	Data    schemas.OpeningResponse `json:"data"`
}
