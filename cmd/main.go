package main

import (
	"context"
	"fmt"
	"log"
	"os/signal"
	"syscall"

	"github.com/CGSG-2021-AE4/tlf/api"
	"github.com/CGSG-2021-AE4/tlf/internal"
	"github.com/CGSG-2021-AE4/tlf/internal/app"
	"github.com/CGSG-2021-AE4/tlf/internal/db/json"
	"github.com/CGSG-2021-AE4/tlf/internal/router"
	"github.com/gin-gonic/gin"
)

// func main() {
// 	router := gin.Default()

// 	// Serving static files

// 	router.GET("/", func(c *gin.Context) {
// 		c.File("frontend/dist/index.html")
// 	})
// 	router.GET("/:page", func(c *gin.Context) {
// 		c.File("frontend/dist/index.html")
// 	})

// 	router.Run(":8080")
// }

func main() {
	log.Println("CGSG forever!!!")

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()

	// Parse flags

	conf := NewConfigFromFlags()

	if err := mainRun(ctx, conf); err != nil {
		log.Println("Finish main with error: ", err.Error())
	}
	log.Println("END")
}

func mainRun(ctx context.Context, conf Config) error {
	// Get router from services

	// Create stores
	trackStore, err := json.NewTrackStore(conf.TrackStoreFilename)
	if err != nil {
		return fmt.Errorf("create track store: %w", err)
	}

	// Create services
	trackSvc := app.NewTracksService(trackStore)

	// Create routers
	rt := api.Routers{Rs: []api.Router{
		router.NewTracksRouter(trackSvc),
		router.NewPagesRouter(conf.IndexFile),
	}}

	// Create middleware

	// Create server
	server := internal.Server{
		Addr:            conf.Domain,
		Midleware:       []gin.HandlerFunc{},
		Router:          rt,
		CertFilename:    conf.CertFilename,
		PrivKeyFilename: conf.PrivKeyFilename,
	}

	// Run server
	if err := server.Start(ctx); err != nil {
		return nil
	}

	// Close services

	// Close stores

	return nil
}
