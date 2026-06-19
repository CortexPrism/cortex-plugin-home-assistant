// deno-lint-ignore-file require-await, no-unused-vars
import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { tools } from '../../mod.ts';
import type { PluginContext, ToolContext } from '../../types.ts';

// Mock PluginContext
const mockContext: PluginContext & ToolContext = {
  pluginId: 'cortex-plugin-home-assistant',
  pluginDir: '/tmp/plugins/cortex-plugin-home-assistant',
  state: {
    get: async () => null,
    set: async () => {},
    delete: async () => {},
    list: async () => ({}),
  },
  config: {
    get: async () => null,
    set: async () => {},
    getAll: async () => ({}),
  },
  logger: {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  },
  host: {
    registerTool: () => {},
    unregisterTool: () => {},
  },
  sessionId: 'test-session',
  workingDir: '/tmp',
  agentId: 'test-agent',
  workspaceDir: '/tmp',
};

function findTool(name: string) {
  const tool = tools.find((t) => t.definition.name === name);
  if (!tool) throw new Error(`Tool "${name}" not found`);
  return tool;
}

Deno.test('tools array — exports all tools', () => {
  assertEquals(tools.length, 6);
  assertEquals(tools[0].definition.name, 'ha_get_state');
  assertEquals(tools[1].definition.name, 'ha_set_state');
  assertEquals(tools[2].definition.name, 'ha_list_entities');
  assertEquals(tools[3].definition.name, 'ha_call_service');
  assertEquals(tools[4].definition.name, 'ha_get_automations');
  assertEquals(tools[5].definition.name, 'ha_create_automation');
});

Deno.test('ha_get_state — rejects empty entity_id', async () => {
  const tool = findTool('ha_get_state');
  const result = await tool.execute({ 'entity_id': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('ha_set_state — rejects empty entity_id', async () => {
  const tool = findTool('ha_set_state');
  const result = await tool.execute({ 'entity_id': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('ha_list_entities — tool is defined with name and description', () => {
  const tool = findTool('ha_list_entities');
  assertEquals(typeof tool.definition.description, 'string');
  assertEquals(tool.definition.description.length > 0, true);
});

Deno.test('ha_call_service — tool is defined with name and description', () => {
  const tool = findTool('ha_call_service');
  assertEquals(typeof tool.definition.description, 'string');
  assertEquals(tool.definition.description.length > 0, true);
});

Deno.test('ha_get_automations — tool is defined with name and description', () => {
  const tool = findTool('ha_get_automations');
  assertEquals(typeof tool.definition.description, 'string');
  assertEquals(tool.definition.description.length > 0, true);
});

Deno.test('ha_create_automation — rejects empty description', async () => {
  const tool = findTool('ha_create_automation');
  const result = await tool.execute({ 'description': '' }, mockContext);
  assertEquals(result.success, false);
  assertStringIncludes(result.error ?? '', 'non-empty string');
});

Deno.test('all tools return durationMs', async () => {
  for (const tool of tools) {
    const args: Record<string, unknown> = {};
    const result = await tool.execute(args, mockContext);
    assertEquals(typeof result.durationMs, 'number');
    assertEquals(result.durationMs >= 0, true);
  }
});
