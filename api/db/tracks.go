package db

import (
	"context"
	"io"

	"github.com/CGSG-2021-AE4/tlf/api/types"
)

type TracksStore interface {
	GetRand(ctx context.Context, limit int) []types.TrackDescriptor

	io.Closer
}
