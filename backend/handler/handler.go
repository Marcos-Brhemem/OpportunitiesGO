package handler

import (
	"github.com/Marcos-Brhemem/OpportunitiesGO/config"
	"gorm.io/gorm"
)

var (
	looger *config.Logger
	db     *gorm.DB
)

func InitializeHandler() {
	looger = config.GetLogger("handler")
	db = config.GetSQLite()
	_ = db // adicionando essa linha para usar a variável db
}
