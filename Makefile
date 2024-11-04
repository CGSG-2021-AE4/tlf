default: run

build:
	@go build -o ./out/tlf.exe ./cmd/

run: build
	@./out/tlf.exe --domain localhost:8080 --track-store-file assets/tracks2.json

convert:
	@py ./utility/fft_converter/convert_dir.py -i ./frontend/static/audio/ -o ./frontend/static/fft/ -j ./assets/tracks2.json -ji static/audio/ -jo static/fft/