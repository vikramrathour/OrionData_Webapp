const graphData = {
  components: [
    { id: "ingest", name: "ORIAN.Data.Ingest", pillar: "foundation", channels: ["tool","specs","prompts","code"] },
    { id: "migrate", name: "ORIAN.Data.Migrate", pillar: "foundation", channels: ["tool","specs","prompts","standards","code"] },
    { id: "transform", name: "ORIAN.Data.Transform", pillar: "foundation", channels: ["tool","specs","prompts","code"] },
    { id: "catalog", name: "ORIAN.Data.Catalog", pillar: "foundation", channels: ["tool","specs","standards","code"] },
    { id: "ontology", name: "ORIAN.Data.Ontology", pillar: "semantic", channels: ["tool","specs","prompts","standards"] },
    { id: "graph", name: "ORIAN.Data.Graph", pillar: "semantic", channels: ["tool","specs","code"] },
    { id: "semantic-layer", name: "ORIAN.Data.Semantic", pillar: "semantic", channels: ["tool","specs","prompts","standards","code"] },
    { id: "context", name: "ORIAN.Data.Context", pillar: "semantic", channels: ["tool","specs","prompts","code"] },
    { id: "agent", name: "ORIAN.Data.Agent", pillar: "ai", channels: ["tool","prompts"] },
    { id: "skills", name: "ORIAN.Data.Skills", pillar: "ai", channels: ["prompts","code"] },
    { id: "estimate", name: "ORIAN.Data.Estimate", pillar: "ai", channels: ["tool","specs","prompts"] },
    { id: "test", name: "ORIAN.Data.Test", pillar: "ai", channels: ["tool","specs","prompts","code"] },
    { id: "sentinel-dq", name: "Sentinel-DQ", pillar: "trust", channels: ["tool","specs","prompts","standards","code"] },
    { id: "lineage", name: "ORIAN.Data.Lineage", pillar: "trust", channels: ["tool","specs","standards","code"] },
    { id: "comply", name: "ORIAN.Data.Comply", pillar: "trust", channels: ["tool","specs","standards"] },
    { id: "observe", name: "ORIAN.Data.Observe", pillar: "trust", channels: ["tool","specs","standards","code"] },
    { id: "shield", name: "ORIAN.Data.Shield", pillar: "trust", channels: ["tool","specs","standards"] },
  ],
  deliveryChannels: ["As a Tool","As Specs & Frameworks","As Prompts & Skills","As Standards & Best Practices","As Code"],
};

const SYSTEM_PROMPT = `You are the ORIAN.Data Solution Planner — an AI that designs tailored data platform solutions using the ORIAN.Data component ecosystem.

ORIAN.Data Components (17 total across 4 pillars):
${graphData.components.map(c => `- ${c.name} (${c.id}) [${c.pillar}] — channels: ${c.channels.join(', ')}`).join('\n')}

Delivery Channels: ${graphData.deliveryChannels.join(', ')}
- "Specs", "Prompts", and "Standards" channels require NO security clearance (Day 1 value)
- "Tool" channel requires full platform installation
- "Code" channel requires minimal security clearance

Your task: Given a client's data challenge, produce a structured JSON solution plan.

ALWAYS respond with valid JSON matching this schema:
{
  "challengeAnalysis": { "summary": "string", "painPoints": ["string"] },
  "recommendedComponents": [{ "id": "component-id", "name": "Full Name", "role": "specific role in this solution", "phase": 1, "deliveryChannel": "channel name" }],
  "edges": [{ "source": "comp-id", "target": "comp-id", "type": "relationship" }],
  "phases": [{ "number": 1, "title": "Phase Title", "weeks": "Weeks 1-4", "components": ["comp-ids"], "deliverables": ["specific deliverables"] }],
  "acceleration": {
    "traditional": { "weeks": 52, "effort": "120 person-months", "cost": "$3.2M" },
    "withOrian": { "weeks": 28, "effort": "52 person-months", "cost": "$1.4M" }
  },
  "deliveryStrategy": { "channels": ["channel names"], "dayOneValue": "what's available immediately", "securityNote": "security consideration" }
}

Guidelines:
- ALWAYS recommend specific components by ID from the registry
- Consider the client's security environment when recommending channels
- Be specific — reference real patterns, not generic consulting language
- Recommend 4-8 components per solution
- Include 2-4 phases
- Provide realistic acceleration estimates based on enterprise data program norms`;

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }),
    };
  }

  try {
    const { message, conversationHistory = [] } = JSON.parse(event.body);

    const messages = [
      ...conversationHistory.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', errText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Failed to generate solution plan' }),
      };
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Extract JSON from the response (handle markdown code blocks)
    const jsonMatch = content.match(/```json\s*([\s\S]*?)```/) || content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;

    const plan = JSON.parse(jsonStr);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan),
    };
  } catch (err) {
    console.error('Solution planner error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}
