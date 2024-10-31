package app

import (
	"context"

	"github.com/CGSG-2021-AE4/tlf/api/db"
	"github.com/CGSG-2021-AE4/tlf/api/services"
	"github.com/CGSG-2021-AE4/tlf/api/types"
)

type TracksService struct {
	trackStore db.TracksStore
}

func NewTracksService(trackStore db.TracksStore) services.Tracks {
	return &TracksService{
		trackStore: trackStore,
	}
}

func (svc *TracksService) GetRand(ctx context.Context, limit int) []types.TrackDescriptor {
	return svc.trackStore.GetRand(ctx, limit)
}

func (svc *TracksService) Close() error {
	return nil
}
