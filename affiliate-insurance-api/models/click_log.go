package models

type ClickLog struct {
	ID           string `json:"id"`
	AffiliatorID string `json:"affiliator_id"`
	WebsiteURL   string `json:"website_url"`
	InsuranceID  string `json:"insurance_id"`
}