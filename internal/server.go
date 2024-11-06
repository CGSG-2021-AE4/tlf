package internal

import (
	"context"
	"crypto/tls"
	"errors"
	"log"
	"net/http"

	"github.com/CGSG-2021-AE4/blog/pkg/cg"
	"github.com/CGSG-2021-AE4/blog/pkg/cg/sscg"
	"github.com/CGSG-2021-AE4/tlf/api"
	"github.com/gin-gonic/gin"
)

// TODO

type Server struct {
	Addr            string // Domain addr
	Midleware       []gin.HandlerFunc
	Router          api.Router
	CertFilename    string
	PrivKeyFilename string

	stopCtx    context.CancelFunc
	httpServer http.Server
}

func (s *Server) Start(ctx context.Context) error {
	ctx, s.stopCtx = context.WithCancel(ctx)

	// Check certificate and private key
	//if err := cg.CheckCert(s.CertFilename); err != nil {
	//	log.Println("Certificate is invalid")
	//	log.Println("Regenerate certificate...")
	//	if err := sscg.Gen(s.CertFilename, s.PrivKeyFilename); err != nil {
	//		return err
	//	}
	//}

	rt := gin.New()

	// Load static files
	rt.Static("/static", "./frontend/static")
	rt.Static("/dist", "./frontend/dist")
	rt.Static("/assets", "./public_assets")
	rt.StaticFile("/favicon.ico", "./resources/favicon.ico")

	// Apply midle
	for _, f := range s.Midleware {
		rt.Use(f)
	}

	// Apply router
	for _, r := range s.Router.Routes() {
		rt.Handle(r.Method, r.Path, r.Handler)
	}

	// Setup http server
	s.httpServer = http.Server{
		Addr:    s.Addr,
		Handler: rt,
		TLSConfig: &tls.Config{
			MinVersion:               tls.VersionTLS13,
			PreferServerCipherSuites: true,
		},
	}

	// Handle context done
	go func() {
		<-ctx.Done()
		if err := s.Stop(); err != nil {
			log.Println("Failed to stop server:", err.Error())
		}
	}()

	// With https
	// if err := s.httpServer.ListenAndServeTLS(s.CertFilename, s.PrivKeyFilename); err != nil && !errors.Is(err, http.ErrServerClosed) {
	// 	return err
	// }
	// Without https
	if err := s.httpServer.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}
	return nil
}

func (s *Server) Stop() error {
	s.stopCtx() // In case context was not canceled? TODO
	// Stop http server
	if err := s.httpServer.Close(); err != nil {
		return err
	}
	return nil
}
