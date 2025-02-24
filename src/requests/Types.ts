// 模型
export interface ModelType {
    id: string;
    name: string;
    category: string;
    project: string;
    fields: FieldType[];
    created_at: number;
    updated_at: number;
}
// 字段信息
export interface FieldType {
    name: string;
    type: string;
    rule: string;
    children?: FieldType[];
}

// Mock规则
export interface MockRuleType {
    id: string;
    name: string;
    value: string;
    note: string;
    enabled: boolean;
    created_at: string;
}
