package handler

import (
	"fmt"
	"net/http"

	"github.com/Marcos-Brhemem/OpportunitiesGO/schemas"
	"github.com/gin-gonic/gin"
)

func UpdateOpeningHandler(ctx *gin.Context) {
	request := UpdateOpeningRequest{}

	ctx.BindJSON(&request)

	if err := request.Validate(); err != nil {
		looger.Errorf("validation error: %v", err.Error())
		SendError(ctx, http.StatusBadRequest, err.Error())
		return
	}

	id := ctx.Query("id")
	if id == "" {
		SendError(ctx, http.StatusBadRequest, errParamIsRequired("id", "queryParameter").Error())
		return
	}
	opening := schemas.Opening{}
	if err := db.First(&opening, id).Error; err != nil {
		SendError(ctx, http.StatusNotFound, "opening not found")
		return
	}
	// Update opening
	if request.Role != "" {
		opening.Role = request.Role
	}

	if request.Company != "" {
		opening.Company = request.Company
	}

	if request.Location != "" {
		opening.Location = request.Location
	}

	if request.Remote != nil {
		opening.Remote = *request.Remote
	}

	if request.Link != "" {
		opening.Link = request.Link
	}

	if request.Salary > 0 {
		opening.Salary = fmt.Sprintf("%d", request.Salary)
	}
	// Save opening
	if err := db.Save(&opening).Error; err != nil {
		looger.Errorf("error updating opening: %v", err.Error())
		SendError(ctx, http.StatusInternalServerError, "error updating opening")
		return
	}
	SendSucess(ctx, "update-opening success", opening)
}
