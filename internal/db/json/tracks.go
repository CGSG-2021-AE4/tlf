package json

import (
	"context"
	"encoding/json"
	"math/rand"
	"os"
	"sync"

	"github.com/CGSG-2021-AE4/tlf/api/types"
)

type TrackStore struct {
	filename string

	mutex  sync.Mutex
	tracks []types.TrackDescriptor
}

func NewTrackStore(filename string) (*TrackStore, error) {
	as := TrackStore{
		filename: filename,
		tracks:   make([]types.TrackDescriptor, 0),
	}
	if err := as.load(); err != nil {
		return nil, err
	}
	return &as, nil
}

func (as *TrackStore) load() error {
	as.mutex.Lock()
	defer as.mutex.Unlock()

	bytes, err := os.ReadFile(as.filename)
	if err != nil {
		return err
	}
	tracks := []types.TrackDescriptor{}
	if err := json.Unmarshal(bytes, &tracks); err != nil {
		return nil
	}
	as.tracks = tracks
	return nil
}

func (as *TrackStore) GetRand(ctx context.Context, limit int) []types.TrackDescriptor {
	tracks := make([]types.TrackDescriptor, limit)

	for i := range tracks { //
		tracks[i] = as.tracks[rand.Int()%len(as.tracks)]
	}
	return tracks
}

func (as *TrackStore) Close() error {
	return nil
}
