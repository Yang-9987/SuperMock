// MockBasicRules
import {mockBasicRule} from "@/assets/MockBasicRule";

let data: { [key: string]: { name: string; value: string; config: any[] } } = mockBasicRule;

export function getMockBasicRulesKey() {
    // 遍历data中的对象，将name和value分别存入options数组
    let options = [];
    for (let key in data) {
        options.push({key: key, name: data[key].name, value: data[key].value });
    }
    return options;
}

export function getMockBasicRulesConfig(key: string) {
    // 返回data中key对应的config
    return data[key.replace("()", "")].config || [];
}

export const generateMockTemplate = (fields) => {
    return fields.reduce((template, field) => {
        if (field.type === 'object' && field.children) {
            template[field.name] = generateMockTemplate(field.children)
        } else if (field.type === 'array' && field.children) {
            template[field.name + '|1-10'] = [generateMockTemplate(field.children)]
        } else if (field.type === 'regexp') {
            let regexpString = field.rule.replaceAll("/", "");
            template[field.name] = new RegExp(regexpString)
        } else {
            template[field.name] = field.rule
        }
        return template
    }, {})
}
