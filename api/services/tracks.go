package api

import (
	"io"

	"github.com/CGSG-2021-AE4/tlf/api/types"
)

type TracksSrv interface {
	GetRand(count int) []types.TrackDescriptor

	io.Closer
}
