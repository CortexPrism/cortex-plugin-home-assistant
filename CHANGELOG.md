# Changelog


## [1.0.3] — 2026-06-22

### Changed

- Migrated to CortexPrism v0.51.0 plugin API
- Renamed `ToolResult` → `ToolCallResult` to match SDK types
- Switched type imports from local `types.ts` to `cortex/plugins` module
- Updated `peerDependencies.cortex` to `>=0.51.0`
- Standardized UI settings: `default` → `defaultValue`, `enum` → `options` for select fields
- All code passes `deno fmt` and `deno lint`
## [Unreleased]

### Added

- Structured logging via ctx.logger in lifecycle hooks

### Changed

- Renamed manifest file from `cortex.json` to `manifest.json` for consistency with Cortex standard
- Standardized UI section structure to `ui.settings` format
- Normalized parameter naming: `defaultValue` → `default`, `options` → `enum`
- Added `homepage` field with repository URL
- Added `dependencies` field to manifest

## [1.0.1] — 2026-06-15

### Added

- Initial release

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
