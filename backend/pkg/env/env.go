package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func Get(env string) string {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println(".env is nil")
	}

	e := os.Getenv(env)
	return e
}
