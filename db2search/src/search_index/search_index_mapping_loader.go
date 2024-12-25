package search_index

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v2"
)

type FieldConfig struct {
	Name     string `yaml:"name"`
	Type     string `yaml:"type"`
	Analyzer string `yaml:"analyzer,omitempty"`
}

type TableConfig struct {
	Name   string        `yaml:"name"`
	Index  string        `yaml:"index"`
	Fields []FieldConfig `yaml:"fields"`
}

type Config struct {
	Tables []TableConfig `yaml:"tables"`
}

func LoadConfig() (*Config, error) {
	file, err := os.ReadFile("src/search_index/search_index_mapping.yaml")
	if err != nil {
		return nil, fmt.Errorf("failed to read config file: %w", err)
	}
	var config Config
	if err := yaml.Unmarshal(file, &config); err != nil {
		return nil, fmt.Errorf("failed to parse config file: %w", err)
	}
	return &config, nil
}
