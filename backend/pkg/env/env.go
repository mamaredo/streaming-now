package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func Get(env string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println(".env is nil")
	}

	e := os.Getenv(env)
	return e
}
