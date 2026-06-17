# Cortex Plugin: Home Assistant / IoT Controller

Cortex agent as a smart home brain: control lights, thermostats, locks, cameras via Home Assistant.

## Installation

```bash
cortex plugin install github:CortexPrism/cortex-plugin-home-assistant
```

## Tools

### ha_get_state

Get the current state of a Home Assistant entity.

- `entity_id` (string, required) — Entity ID (e.g. light.living_room)

### ha_set_state

Set an entity's state (on/off/home/away/numeric).

- `entity_id` (string, required) — Entity ID
- `state` (string, required) — Target state: on, off, home, away, or numeric
- `attributes` (string, optional) — JSON attributes (brightness, color, etc.)

### ha_list_entities

List entities filtered by domain and/or area.

- `domain` (string, optional) — Filter: light, switch, climate, lock, camera, sensor
- `area` (string, optional) — Filter by area name

### ha_call_service

Call a Home Assistant service.

- `domain` (string, required) — Service domain: light, switch, climate, lock, script, scene
- `service` (string, required) — Service: turn_on, turn_off, toggle, set_temperature, lock, unlock
- `entity_id` (string, optional) — Target entity
- `data` (string, optional) — JSON service data payload

### ha_get_automations

List all configured automations.

### ha_create_automation

Create an automation from a natural language description.

- `description` (string, required) — e.g. "Turn on porch light at sunset"
- `trigger` (string, optional) — JSON trigger configuration
- `action` (string, optional) — JSON action configuration

## Configuration

| Key       | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| `haUrl`   | text   | Home Assistant URL (default: http://homeassistant.local:8123) |
| `haToken` | secret | Long-lived access token (required)                            |

## Development

```bash
deno task test
deno fmt
deno lint
```

## License

MIT
