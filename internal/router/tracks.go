package router

import (
	"log"
	"net/http"
	"strconv"

	"github.com/CGSG-2021-AE4/blog/api/router"
	"github.com/CGSG-2021-AE4/tlf/api"
	"github.com/CGSG-2021-AE4/tlf/api/services"
	"github.com/gin-gonic/gin"
)

type TracksRouter struct {
	tracksSvc services.Tracks
}

func NewTracksRouter(svc services.Tracks) api.Router {
	return &TracksRouter{
		tracksSvc: svc,
	}
}

func (tr *TracksRouter) Routes() []api.Route {
	return []api.Route{
		// Tracks
		{Method: http.MethodGet, Path: "/api/getRand", Handler: getRandHandler(tr.tracksSvc)},
	}
}

func getRandHandler(ts services.Tracks) gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("Get tracks")
		str := c.Request.URL.Query().Get("limit")
		if str == "" {
			c.JSON(http.StatusBadRequest, router.ErrorResp{Err: "no limit presented"})
			return
		}
		limit, err := strconv.Atoi(str)
		if err != nil {
			c.JSON(http.StatusBadRequest, router.ErrorResp{Err: err.Error()})
			return
		}
		tracks := ts.GetRand(c, limit)
		c.JSON(http.StatusOK, tracks)
	}
}
