package models

type Insurance struct {
	ID        string  `json:"id"`
	Name      string  `json:"name"`
	Company   string  `json:"company"`
	Category  string  `json:"category"`
	Price     float64 `json:"price"`
	DetailURL string  `json:"detail_url"`
}