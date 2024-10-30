package db

import (
	"io"

	"github.com/CGSG-2021-AE4/tlf/api/types"
)

type TracksStore interface {
	GetRand(count int) []types.TrackDescriptor

	io.Closer
}
