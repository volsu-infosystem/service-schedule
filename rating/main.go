package main

import (
	"fmt"
	"log"
)

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