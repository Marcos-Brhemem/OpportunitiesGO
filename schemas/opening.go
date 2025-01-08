package schemas

import (
	"gorm.io/gorm"
)

type Opening struct {
	gorm.Model
	Role     string
	Company  string
	Location string
	Remote   bool
	Link     string
	Salary   string
}

type OpeningResponse struct {
	ID        uint   `json:"id"`
	CreatedAt string `json:"createdAt"`
	UpdateAt  string `json:"updateAt"`
	DeleteAT  string `json:"deleteAt,omitempty"`
	Role      string `json:"role"`
	Company   string `json:"company"`
	Location  string `json:"location"`
	Remote    bool   `json:"remote"`
	Link      string `json:"link"`
	Salary    string `json:"salary"`
}
