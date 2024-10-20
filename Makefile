default: run

build:
	@go build -o ./out/tlf.exe ./cmd/

run: build
	@./out/tlf.exe --domain localhost:8080