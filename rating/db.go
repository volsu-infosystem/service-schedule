package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func connectDB() (*sql.DB) {
	connStr := `postgres://` + os.Getenv("POSTGRES_USER") + `:` + os.Getenv("POSTGRES_PASSWORD") + `@` + os.Getenv("POSTGRES_HOST") + `:` + os.Getenv("POSTGRES_PORT") + `/` + os.Getenv("POSTGRES_DB") + `?sslmode=disable`

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	return db
}