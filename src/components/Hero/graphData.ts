import type { GraphNode, GraphLink } from '../../types/graph'

export const PILLAR_COLORS: Record<string, string> = {
  foundation: '#3b82f6',
  semantic: '#00d4aa',
  ai: '#a78bfa',
  trust: '#f5a623',
}

export const nodes: GraphNode[] = [
  // Foundation (blue)
  { id: 'n1', rawLabel: 'tbl_cust_v3', intentLabel: 'Customer Lifetime Value', tier: 'primary', pillar: 'foundation' },
  { id: 'n2', rawLabel: 'txn_log_2024', intentLabel: 'Settlement Risk Exposure', tier: 'primary', pillar: 'foundation' },
  { id: 'n3', rawLabel: 'dim_product_stg', intentLabel: 'Revenue Attribution', tier: 'secondary', pillar: 'foundation' },
  { id: 'n4', rawLabel: 'etl_batch_output', intentLabel: 'Operational Efficiency', tier: 'secondary', pillar: 'foundation' },
  // Semantic (teal)
  { id: 'n5', rawLabel: 'src_claims_raw', intentLabel: 'Regulatory Compliance', tier: 'primary', pillar: 'semantic' },
  { id: 'n6', rawLabel: 'ref_acct_master', intentLabel: 'Customer 360 Context', tier: 'primary', pillar: 'semantic' },
  { id: 'n7', rawLabel: 'stg_market_feed', intentLabel: 'Market Signal Intelligence', tier: 'secondary', pillar: 'semantic' },
  { id: 'n8', rawLabel: 'src_ehr_claims', intentLabel: 'Clinical Outcome Prediction', tier: 'secondary', pillar: 'semantic' },
  // AI (purple)
  { id: 'n9', rawLabel: 'fact_risk_agg', intentLabel: 'Predictive Risk Score', tier: 'primary', pillar: 'ai' },
  { id: 'n10', rawLabel: 'raw_kyc_docs', intentLabel: 'Identity Confidence Score', tier: 'secondary', pillar: 'ai' },
  // Trust (amber)
  { id: 'n11', rawLabel: 'log_audit_trail', intentLabel: 'Decision Accountability', tier: 'primary', pillar: 'trust' },
  { id: 'n12', rawLabel: 'iot_sensor_dump', intentLabel: 'Predictive Maintenance Signal', tier: 'secondary', pillar: 'trust' },
]

export const links: GraphLink[] = [
  { source: 'n1', target: 'n2' },
  { source: 'n1', target: 'n6' },
  { source: 'n2', target: 'n5' },
  { source: 'n2', target: 'n9' },
  { source: 'n3', target: 'n1' },
  { source: 'n3', target: 'n4' },
  { source: 'n4', target: 'n11' },
  { source: 'n5', target: 'n11' },
  { source: 'n5', target: 'n8' },
  { source: 'n6', target: 'n7' },
  { source: 'n6', target: 'n8' },
  { source: 'n7', target: 'n9' },
  { source: 'n8', target: 'n10' },
  { source: 'n9', target: 'n10' },
  { source: 'n9', target: 'n11' },
  { source: 'n10', target: 'n12' },
  { source: 'n11', target: 'n12' },
  { source: 'n12', target: 'n4' },
  { source: 'n3', target: 'n7' },
  { source: 'n6', target: 'n1' },
]

export const mobileNodeIds = new Set(['n1', 'n2', 'n5', 'n6', 'n9'])
