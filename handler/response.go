package handler

import (
	"net/http"

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
