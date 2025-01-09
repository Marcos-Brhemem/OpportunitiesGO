package handler

import (
	"net/http"

	"github.com/Marcos-Brhemem/OpportunitiesGO/schemas"
	"github.com/gin-gonic/gin"
)

func ListOpeningHandler(ctx *gin.Context) {
	openings := []schemas.Opening{}

	if err := db.Find(&openings).Error; err != nil {
		SendError(ctx, http.StatusInternalServerError, "error listing openings")
		return
	}

	SendSucess(ctx, "list-opening success", openings)
}
