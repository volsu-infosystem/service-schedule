package main

import (
	"database/sql"
	"fmt"
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

func main() {
	db := connectDB()

	/* К примеру выборка */
	rows, err := db.Query("SELECT * FROM public.discipline ORDER BY id ASC ")

	if err != nil {
			log.Fatal(err)
	}

	defer rows.Close()

	for rows.Next() {
			var 
					( 
						a string
						b string
						c string
						d string 
					)
			if err := rows.Scan(&a, &b, &c, &d); err != nil {
							log.Fatal(err)
			}
			fmt.Printf("%s %s %s %s \n", a,b,c,d)
	}

	if err := rows.Err(); err != nil {
			log.Fatal(err)
	}
}