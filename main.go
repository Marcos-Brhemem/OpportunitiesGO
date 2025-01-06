package main

import (
	"github.com/Marcos-Brhemem/OpportunitiesGO/config"
	"github.com/Marcos-Brhemem/OpportunitiesGO/router"
)

var (
	looger *config.Logger
)

func main() {

	looger = config.GetLogger("main")

	// Initialize Configs

	err := config.Init()

	if err != nil {
		looger.Errorf("config initialization error: %v", err)
		return
	}

	// Initialize Router
	router.Initialize()
}
