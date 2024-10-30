package router

import (
	"net/http"

	"github.com/CGSG-2021-AE4/tlf/api"
	"github.com/gin-gonic/gin"
)

type PagesRouter struct {
	indexFile string
}

func NewPagesRouter(f string) api.Router {
	return &PagesRouter{
		indexFile: f,
	}
}

func (pr *PagesRouter) Routes() []api.Route {
	return []api.Route{
		// Pages
		{Method: http.MethodGet, Path: "/", Handler: func(c *gin.Context) { c.File(pr.indexFile) }},
		{Method: http.MethodGet, Path: "/:page", Handler: func(c *gin.Context) { c.File(pr.indexFile) }},
	}
}
