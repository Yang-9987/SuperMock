export const mockBasicRule = {
    "@boolean": {
        "name": "布尔值",
        "value": "@boolean()",
        "config": []
    },
    "@natural": {
        "name": "自然数",
        "value": "@natural()",
        "config": [{
            "name": "最小值/最大值",
            "value": "@natural(min, max)",
            "config": {
                "min": 1,
                "max": 100
            }
        }]
    },
    "@integer": {
        "name": "整数",
        "value": "@integer()",
        "config": [{
            "name": "最小值",
            "value": "@integer(min)",
            "config": {
                "min": 1
            }
        },{
            "name": "最小值/最大值",
            "value": "@integer(min, max)",
            "config": {
                "min": 1,
                "max": 100
            }
        }]
    },
    "@float": {
        "name": "浮点数",
        "value": "@float()",
        "config": [{
            "name": "最小值",
            "value": "@float(min)",
            "config": {
                "min": 1
            }
        },{
            "name": "最小值/最大值",
            "value": "@float(min, max)",
            "config": {
                "min": 1,
                "max": 100
            }
        },{
            "name": "最小值/最大值/小数位数",
            "value": "@float(min, max, dmin)",
            "config": {
                "min": 1,
                "max": 100,
                "dmin": 1
            }
        },{
            "name": "最小值/最大值/小数位数/小数位数",
            "value": "@float(min, max, dmin, dmax)",
            "config": {
                "min": 1,
                "max": 100,
                "dmin": 1,
                "dmax": 3
            }
        }]
    },
    "@character": {
        "name": "字符",
        "value": "@character()",
        "config": [{
            "name": "字符集",
            "value": "@character(pool)",
            "config": {
                "pool": "abcdefghijklmnopqrstuvwxyz"
            }
        },{
            "name": "指定类型",
            "value": "@character(type)",
            "config": {
                "type": ["lower", "upper", "number", "symbol"]
            }
        }]
    },
    "@string": {
        "name": "字符串",
        "value": "@string()",
        "config": [{
            "name": "长度",
            "value": "@string(length)",
            "config": {
                "length": 5
            }
        },{
            "name": "长度/字符集",
            "value": "@string(pool, length)",
            "config": {
                "length": 5,
                "pool": "abcdefghijklmnopqrstuvwxyz"
            }
        },{
            "name": "最小值/最大值",
            "value": "@string(min, max)",
            "config": {
                "min": 5,
                "max": 10
            }
        },{
            "name": "字符集/最小值/最大值",
            "value": "@string(pool, min, max)",
            "config": {
                "pool": "abcdefghijklmnopqrstuvwxyz",
                "min": 5,
                "max": 10
            }
        }]
    },
    "@range": {
        "name": "范围",
        "value": "@range()",
        "config": [{
            "name": "终止值",
            "value": "@range(stop)",
            "config": {
                "stop": 10
            }
        },{
            "name": "起始值/终止值",
            "value": "@range(start, stop)",
            "config": {
                "start": 1,
                "stop": 10
            }
        },{
            "name": "起始值/终止值/步长",
            "value": "@range(start, stop, step)",
            "config": {
                "start": 1,
                "stop": 10,
                "step": 2
            }
        }]
    },
    "@date": {
        "name": "日期",
        "value": "@date()",
        "config": [{
            "name": "格式",
            "value": "@date(format)",
            "config": {
                "format": "yyyy-MM-dd",
            }
        }]
    },
    "@time": {
        "name": "时间",
        "value": "@time()",
        "config": [{
            "name": "格式",
            "value": "@time(format)",
            "config": {
                "format": "HH:mm:ss",
            }
        }]
    },
    "@datetime": {
        "name": "日期时间",
        "value": "@datetime()",
        "config": [{
            "name": "格式",
            "value": "@datetime(format)",
            "config": {
                "format": "yyyy-MM-dd HH:mm:ss",
            }
        }]
    },
    "@now": {
        "name": "当前时间",
        "value": "@now()",
        "config": [{
            "name": "格式",
            "value": "@now(format)",
            "config": {
                "format": "yyyy-MM-dd HH:mm:ss",
            }
        },{
            "name": "单位",
            "value": "@now(unit)",
            "config": {
                "unit": ["second", "minute", "hour", "day", "week", "month", "year"]
            }
        },{
            "name": "单位/格式",
            "value": "@now(unit, format)",
            "config": {
                "unit": ["second", "minute", "hour", "day", "week", "month", "year"],
                "format": "yyyy-MM-dd HH:mm:ss",
            }
        }]
    }
}
