package main

import (
	"github.com/gin-gonic/gin"
)

type PageName struct {
	Page string `uri:"page" binding:"required"`
}

func main() {
	router := gin.Default()

	// Serving static files
	router.Static("/static", "./frontend/static")
	router.Static("/dist", "./frontend/dist")
	router.StaticFile("/favicon.ico", "./resources/favicon.ico")

	router.GET("/", func(c *gin.Context) {
		c.File("frontend/index.html")
	})
	router.GET("/:page", func(c *gin.Context) {
		c.File("frontend/index.html")
	})

	router.Run(":8080")
}
