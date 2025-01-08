package handler

import (
	"fmt"
	"net/http"

	"github.com/Marcos-Brhemem/OpportunitiesGO/schemas"
	"github.com/gin-gonic/gin"
)

func CreateOpeningHandler(ctx *gin.Context) {
	request := CreatingOpeningRequest{}
	ctx.BindJSON(&request)

	if err := request.Validate(); err != nil {
		looger.Errorf("validation error: %v", err.Error())
		SendError(ctx, http.StatusBadRequest, err.Error())
		return
	}

	opening := schemas.Opening{
		Role:     request.Role,
		Company:  request.Company,
		Location: request.Location,
		Remote:   *request.Remote,
		Link:     request.Link,
		Salary:   fmt.Sprintf("%d", request.Salary),
	}

	if err := db.Create(&opening).Error; err != nil {
		looger.Errorf("error creating opening: %v", err.Error())
		SendError(ctx, http.StatusInternalServerError, "error creating opening on database")
		return
	}

	SendSucess(ctx, "create-opening success", opening)
}
