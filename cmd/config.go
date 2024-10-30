package main

import (
	"flag"
)

type Config struct {
	Domain string `json:"domain"`

	// Sertificates
	CertFilename    string `json:"certFilename"`
	PrivKeyFilename string `json:"privKeyFilename"`

	IndexFile string `json:"indexFile"`
}

func NewConfigFromFlags() Config {
	var config Config

	flag.StringVar(&config.Domain, "domain", "localhost:8080", "Domain address")

	flag.StringVar(&config.CertFilename, "cert-file", "out/cert.pem", "Certification filename")
	flag.StringVar(&config.PrivKeyFilename, "key-file", "out/key.pem", "Private key filename")

	flag.StringVar(&config.IndexFile, "index-file", "frontend/dist/index.html", "Index html page filename")

	flag.Parse()

	return config
}
