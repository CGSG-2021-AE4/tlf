default: run

build:
	@go build -o ./out/tlf.exe ./cmd/

run: build
	@./out/tlf.exe --domain localhost:8080

convert:
	@py ./utility/fft_converter/convert_dir.py -i ./frontend/static/audio/ -o ./frontend/static/fft/ -j ./assets/tracks2.json -ji static/audio/ -jo static/fft/