package handler

import (
	"net/http"

	"github.com/Marcos-Brhemem/OpportunitiesGO/schemas"
	"github.com/gin-gonic/gin"
)

// @BasePath /api/v1

// @Summary List openings
// @Description List all job opening
// @Tags Openings
// @Accept json
// @Produce json
// @Success 200 {object} ListOpeningsResponse
// @Failure 400 {object} ErrorResponse
// @Failure 500 {object} ErrorResponse
// @Router /openings [get]
func ListOpeningHandler(ctx *gin.Context) {
	openings := []schemas.Opening{}

	if err := db.Find(&openings).Error; err != nil {
		SendError(ctx, http.StatusInternalServerError, "error listing openings")
		return
	}

	SendSucess(ctx, "list-opening success", openings)
}
