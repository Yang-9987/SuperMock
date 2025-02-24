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
    },
    "@image": {
        "name": "图片",
        "value": "@image()",
        "config": [{
            "name": "大小",
            "value": "@image(size)",
            "config": {
                "size": "100x100"
            }
        },{
            "name": "大小/背景色",
            "value": "@image(size, background)",
            "config": {
                "size": "100x100",
                "background": "#FF6600"
            }
        },{
            "name": "大小/背景色/文本",
            "value": "@image(size, background, text)",
            "config": {
                "size": "100x100",
                "background": "#FF6600",
                "text": "Hello"
            }
        },{
            "name": "大小/背景色/前景色/文本",
            "value": "@image(size, background, foreground, text)",
            "config": {
                "size": "100x100",
                "background": "#FF6600",
                "foreground": "#FFF",
                "text": "Hello"
            }
        },{
            "name": "大小/背景色/前景色/格式/文本",
            "value": "@image(size, background, foreground, format, text)",
            "config": {
                "size": "100x100",
                "background": "#FF6600",
                "foreground": "#FFF",
                "format": "png",
                "text": "Hello"
            }
        }]
    },
    "@dataImage": {
        "name": "数据图片",
        "value": "@dataImage()",
        "config": [{
            "name": "大小",
            "value": "@dataImage(size)",
            "config": {
                "size": "100x100"
            }
        },{
            "name": "大小/文本",
            "value": "@dataImage(size, text)",
            "config": {
                "size": "100x100",
                "text": "Hello"
            }
        }]
    },
    "@color": {
        "name": "颜色",
        "value": "@color()",
        "config": []
    },
    "@hex": {
        "name": "十六进制",
        "value": "@hex()",
        "config": []
    },
    "@rgb": {
        "name": "RGB",
        "value": "@rgb()",
        "config": []
    },
    "@rgba": {
        "name": "RGBA",
        "value": "@rgba()",
        "config": []
    },
    "@hsl": {
        "name": "HSL",
        "value": "@hsl()",
        "config": []
    },
    "@paragraph": {
        "name": "段落",
        "value": "@paragraph()",
        "config": [{
            "name": "句子数",
            "value": "@paragraph(len)",
            "config": {
                "len": 2
            }
        },{
            "name": "最小值/最大值",
            "value": "@paragraph(min, max)",
            "config": {
                "min": 3,
                "max": 5
            }
        }]
    },
    "@sentence": {
        "name": "句子",
        "value": "@sentence()",
        "config": [{
            "name": "单词数",
            "value": "@sentence(len)",
            "config": {
                "len": 5
            }
        },{
            "name": "最小值/最大值",
            "value": "@sentence(min, max)",
            "config": {
                "min": 5,
                "max": 10
            }
        }]
    },
    "@word": {
        "name": "单词",
        "value": "@word()",
        "config": [{
            "name": "长度",
            "value": "@word(len)",
            "config": {
                "len": 5
            }
        },{
            "name": "最小值/最大值",
            "value": "@word(min, max)",
            "config": {
                "min": 5,
                "max": 10
            }
        }]
    },
    "@cparagraph": {
        "name": "中文段落",
        "value": "@cparagraph()",
        "config": [{
            "name": "句子数",
            "value": "@cparagraph(len)",
            "config": {
                "len": 2
            }
        },{
            "name": "最小值/最大值",
            "value": "@cparagraph(min, max)",
            "config": {
                "min": 3,
                "max": 5
            }
        }]
    },
    "@csentence": {
        "name": "中文句子",
        "value": "@csentence()",
        "config": [{
            "name": "单词数",
            "value": "@csentence(len)",
            "config": {
                "len": 5
            }
        },{
            "name": "最小值/最大值",
            "value": "@csentence(min, max)",
            "config": {
                "min": 5,
                "max": 10
            }
        }]
    },
    "@cword": {
        "name": "中文单词",
        "value": "@cword()",
        "config": [{
            "name": "字典池",
            "value": "@cword(pool)",
            "config": {
                "pool": "零一二三四五六七八九十"
            }
        },{
            "name": "长度",
            "value": "@cword(len)",
            "config": {
                "len": 5
            }
        },{
            "name": "字典池/长度",
            "value": "@cword(pool, len)",
            "config": {
                "pool": "零一二三四五六七八九十",
                "len": 5
            }
        },{
            "name": "最小值/最大值",
            "value": "@cword(min, max)",
            "config": {
                "min": 5,
                "max": 10
            }
        },{
            "name": "字典池/最小值/最大值",
            "value": "@cword(pool, min, max)",
            "config": {
                "pool": "零一二三四五六七八九十",
                "min": 5,
                "max": 10
            }
        }]
    },
    "@ctitle": {
        "name": "中文标题",
        "value": "@ctitle()",
        "config": [{
            "name": "长度",
            "value": "@ctitle(len)",
            "config": {
                "len": 5
            }
        },{
            "name": "最小值/最大值",
            "value": "@ctitle(min, max)",
            "config": {
                "min": 5,
                "max": 10
            }
        }]
    },
    "@first": {
        "name": "名",
        "value": "@first()",
        "config": []
    },
    "@last": {
        "name": "姓",
        "value": "@last()",
        "config": []
    },
    "@name": {
        "name": "姓名",
        "value": "@name()",
        "config": [{
            "name": "中间名",
            "value": "@name(middle)",
            "config": {
                "middle": true
            }
        }]
    },
    "@cfirst": {
        "name": "中文名",
        "value": "@cfirst()",
        "config": []
    },
    "@clast": {
        "name": "中文姓",
        "value": "@clast()",
        "config": []
    },
    "@cname": {
        "name": "中文姓名",
        "value": "@cname()",
        "config": []
    },
    "@url": {
        "name": "URL",
        "value": "@url()",
        "config": []
    },
    "@domain": {
        "name": "域名",
        "value": "@domain()",
        "config": []
    },
    "@protocol": {
        "name": "协议",
        "value": "@protocol()",
        "config": []
    },
    "@tld": {
        "name": "顶级域名",
        "value": "@tld()",
        "config": []
    },
    "@email": {
        "name": "邮箱",
        "value": "@email()",
        "config": []
    },
    "@ip": {
        "name": "IP",
        "value": "@ip()",
        "config": []
    },
    "@region": {
        "name": "地区",
        "value": "@region()",
        "config": []
    },
    "@province": {
        "name": "省",
        "value": "@province()",
        "config": []
    },
    "@city": {
        "name": "市",
        "value": "@city()",
        "config": []
    },
    "@county": {
        "name": "县",
        "value": "@county()",
        "config": []
    },
    "@zip": {
        "name": "邮政编码",
        "value": "@zip()",
        "config": []
    },
    "@capitalize": {
        "name": "首字母大写",
        "value": "@capitalize()",
        "config": []
    },
    "@upper": {
        "name": "大写",
        "value": "@upper()",
        "config": []
    },
    "@lower": {
        "name": "小写",
        "value": "@lower()",
        "config": []
    },
    "@pick": {
        "name": "随机选择",
        "value": "@pick()",
        "config": [{
            "name": "数组",
            "value": "@pick(array)",
            "config": {
                "array": ["a", "b", "c"]
            }
        }]
    },
    "@shuffle": {
        "name": "洗牌",
        "value": "@shuffle()",
        "config": [{
            "name": "数组",
            "value": "@shuffle(array)",
            "config": {
                "array": ["a", "b", "c"]
            }
        }]
    },
    "@guid": {
        "name": "GUID",
        "value": "@guid()",
        "config": []
    },
    "@id": {
        "name": "ID",
        "value": "@id()",
        "config": []
    },
    "@increment": {
        "name": "自增",
        "value": "@increment()",
        "config": [{
            "name": "步长",
            "value": "@increment(step)",
            "config": {
                "step": 2
            }
        }]
    }
}
