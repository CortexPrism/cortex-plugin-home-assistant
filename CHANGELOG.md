# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] — 2026-06-17

### Added

- Initial project setup

## [1.0.0] — 2026-06-15

### Added

- Initial release of cortex-plugin-home-assistant
- `ha_get_state` — Query entity state from Home Assistant
- `ha_set_state` — Control entities (on/off/home/away/numeric)
- `ha_list_entities` — List entities by domain and area
- `ha_call_service` — Call Home Assistant services across 6 domains
- `ha_get_automations` — List all configured automations
- `ha_create_automation` — Create automations from natural language descriptions
- UI settings for Home Assistant URL and long-lived access token
