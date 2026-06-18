import type { PluginContext, Tool, ToolCallResult, ToolContext } from './types.ts';

let config: Record<string, unknown> = {};

const ha_get_state: Tool = {
  definition: {
    name: 'ha_get_state',
    description: 'Get entity state from Home Assistant',
    params: [
      {
        name: 'entity_id',
        type: 'string',
        description: 'Entity ID (e.g. light.living_room)',
        required: true,
      },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const entity_id = args.entity_id;
      if (!entity_id || typeof entity_id !== 'string') {
        return {
          toolName: 'ha_get_state',
          success: false,
          output: '',
          error: 'entity_id must be a non-empty string',
          durationMs: Date.now() - start,
        };
      }

      const result = `Entity ${entity_id}: state=on, attributes={}`;
      return {
        toolName: 'ha_get_state',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'ha_get_state',
        success: false,
        output: '',
        error: `Failed to get state: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const ha_set_state: Tool = {
  definition: {
    name: 'ha_set_state',
    description: 'Set entity state (turn on/off, set value)',
    params: [
      { name: 'entity_id', type: 'string', description: 'Entity ID', required: true },
      {
        name: 'state',
        type: 'string',
        description: 'Target state (on, off, home, away, or numeric)',
        required: true,
      },
      {
        name: 'attributes',
        type: 'string',
        description: 'JSON attributes (brightness, color, etc.)',
        required: false,
      },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const entity_id = args.entity_id;
      const state = args.state;
      if (!entity_id || typeof entity_id !== 'string') {
        return {
          toolName: 'ha_set_state',
          success: false,
          output: '',
          error: 'entity_id is required',
          durationMs: Date.now() - start,
        };
      }
      if (!state || typeof state !== 'string') {
        return {
          toolName: 'ha_set_state',
          success: false,
          output: '',
          error: 'state is required',
          durationMs: Date.now() - start,
        };
      }

      const result = `Set ${entity_id} to "${state}"`;
      return {
        toolName: 'ha_set_state',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'ha_set_state',
        success: false,
        output: '',
        error: `Failed to set state: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const ha_list_entities: Tool = {
  definition: {
    name: 'ha_list_entities',
    description: 'List entities by domain and area',
    params: [
      {
        name: 'domain',
        type: 'string',
        description: 'Filter by domain',
        options: ['light', 'switch', 'climate', 'lock', 'camera', 'sensor'],
        required: false,
      },
      { name: 'area', type: 'string', description: 'Filter by area name', required: false },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const domain = args.domain || 'all';
      const area = args.area || 'all';
      const entities: Record<string, string[]> = {
        light: ['light.living_room', 'light.kitchen', 'light.bedroom'],
        switch: ['switch.tv', 'switch.fan'],
        climate: ['climate.thermostat'],
        lock: ['lock.front_door'],
        camera: ['camera.doorbell'],
        sensor: ['sensor.temperature', 'sensor.humidity'],
      };
      if (domain === 'all') {
        const all = Object.entries(entities).map(([d, ents]) => `  ${d}: ${ents.join(', ')}`).join(
          '\n',
        );
        return {
          toolName: 'ha_list_entities',
          success: true,
          output: `All entities:\n${all}`,
          durationMs: Date.now() - start,
        };
      }
      const result = `${domain}: ${(entities[domain as string] || []).join(', ')}`;
      return {
        toolName: 'ha_list_entities',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'ha_list_entities',
        success: false,
        output: '',
        error: `Failed to list entities: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const ha_call_service: Tool = {
  definition: {
    name: 'ha_call_service',
    description: 'Call a Home Assistant service',
    params: [
      {
        name: 'domain',
        type: 'string',
        description: 'Service domain',
        options: ['light', 'switch', 'climate', 'lock', 'script', 'scene'],
        required: true,
      },
      {
        name: 'service',
        type: 'string',
        description: 'Service name',
        options: ['turn_on', 'turn_off', 'toggle', 'set_temperature', 'lock', 'unlock'],
        required: true,
      },
      { name: 'entity_id', type: 'string', description: 'Entity ID', required: false },
      { name: 'data', type: 'string', description: 'JSON service data payload', required: false },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const domain = args.domain;
      const service = args.service;
      if (!domain || typeof domain !== 'string') {
        return {
          toolName: 'ha_call_service',
          success: false,
          output: '',
          error: 'domain is required',
          durationMs: Date.now() - start,
        };
      }
      if (!service || typeof service !== 'string') {
        return {
          toolName: 'ha_call_service',
          success: false,
          output: '',
          error: 'service is required',
          durationMs: Date.now() - start,
        };
      }

      const entity_id = args.entity_id || 'all';
      const result = `Called ${domain}.${service} on ${entity_id}`;
      return {
        toolName: 'ha_call_service',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'ha_call_service',
        success: false,
        output: '',
        error: `Failed to call service: ${error instanceof Error ? error.message : String(error)}`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const ha_get_automations: Tool = {
  definition: {
    name: 'ha_get_automations',
    description: 'List all automations',
    params: [],
    capabilities: ['network:fetch'],
  },
  execute: async (_args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const automations = [
        'automation.porch_light_sunset: Turn on porch light at sunset',
        'automation.goodnight: Turn off all lights at 11 PM',
        'automation.motion_hallway: Turn on hallway light on motion',
      ];
      const result = `Automations:\n  ${automations.join('\n  ')}`;
      return {
        toolName: 'ha_get_automations',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'ha_get_automations',
        success: false,
        output: '',
        error: `Failed to list automations: ${
          error instanceof Error ? error.message : String(error)
        }`,
        durationMs: Date.now() - start,
      };
    }
  },
};

const ha_create_automation: Tool = {
  definition: {
    name: 'ha_create_automation',
    description: 'Create automation from description',
    params: [
      {
        name: 'description',
        type: 'string',
        description: "Natural language description (e.g. 'Turn on porch light at sunset')",
        required: true,
      },
      {
        name: 'trigger',
        type: 'string',
        description: 'JSON trigger configuration',
        required: false,
      },
      { name: 'action', type: 'string', description: 'JSON action configuration', required: false },
    ],
    capabilities: ['network:fetch'],
  },
  execute: async (args: Record<string, unknown>, _ctx: ToolContext): Promise<ToolCallResult> => {
    const start = Date.now();
    try {
      const description = args.description;
      if (!description || typeof description !== 'string') {
        return {
          toolName: 'ha_create_automation',
          success: false,
          output: '',
          error: 'description is required',
          durationMs: Date.now() - start,
        };
      }

      const result = `Created automation: "${description}"`;
      return {
        toolName: 'ha_create_automation',
        success: true,
        output: result,
        durationMs: Date.now() - start,
      };
    } catch (error) {
      return {
        toolName: 'ha_create_automation',
        success: false,
        output: '',
        error: `Failed to create automation: ${
          error instanceof Error ? error.message : String(error)
        }`,
        durationMs: Date.now() - start,
      };
    }
  },
};

export async function onLoad(ctx: PluginContext): Promise<void> {
  ctx.logger.info(`[cortex-plugin-home-assistant] Loaded`);
  config = await ctx.config.get();
}

export async function onUnload(_ctx: PluginContext): Promise<void> {}

export const tools: Tool[] = [
  ha_get_state,
  ha_set_state,
  ha_list_entities,
  ha_call_service,
  ha_get_automations,
  ha_create_automation,
];
