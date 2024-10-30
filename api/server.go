package api

import (
	"context"
)

type Server interface {
	Start(ctx context.Context) error
	Stop() error
}
