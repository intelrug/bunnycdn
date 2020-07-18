export interface EdgeRule {
  Guid: string;
  ActionType: number;
  ActionParameter1: string;
  ActionParameter2: string;
  TriggerMatchingType: number;
  Description: string;
  Enabled: boolean;
  Triggers: Trigger[];
}

export interface Trigger {
  Type: number;
  PatternMatches: string[];
  PatternMatchingType: number;
  Parameter1: string;
}
