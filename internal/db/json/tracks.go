package json

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"regexp"
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

	// SHIT
	isUrl, _ := regexp.MatchString("\\S+\\.\\S+/\\S+", as.filename)

	buf := new(bytes.Buffer)
	var bytes []byte

	if isUrl {
		res, err := http.Get(as.filename)
		print("a")
		if err != nil {
			return fmt.Errorf("fetch remote file: %w", err)
		}

		print(res)
		defer res.Body.Close()
		buf.ReadFrom(res.Body)
		bytes = buf.Bytes()
	} else {
		buf, err := os.ReadFile(as.filename)
		if err != nil {
			return fmt.Errorf("read local file: %w", err)
		}
		bytes = buf
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
