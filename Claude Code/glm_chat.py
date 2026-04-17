#!/usr/bin/env python3
import json
import os
import sys
import urllib.request
import urllib.error


def getenv(name: str, default: str = "") -> str:
    val = os.getenv(name)
    return val if val is not None else default


def main():
    question = "你好，请简单介绍一下你自己"
    if len(sys.argv) > 1:
        question = " ".join(sys.argv[1:])

    api_key = getenv("ZHIPU_API_KEY")
    base_url = getenv("ZHIPU_BASE_URL", "https://open.bigmodel.cn/api/paas/v4")
    model = getenv("ZHIPU_MODEL", "glm-4.5")

    if not api_key:
        print("[提示] 未检测到 ZHIPU_API_KEY 环境变量，已安全跳过实际调用。")
        print("[用法] 在设置好环境变量后运行：python3 scripts/glm_chat.py 你的问题")
        return 0

    url = f"{base_url.rstrip('/')}/chat/completions"
    payload = {
        "model": model,
        "messages": [
            {"role": "user", "content": question},
        ],
        # 智谱接口支持思考模式与流式，示例为非流式基础调用
        "temperature": 0.6,
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", f"Bearer {api_key}")

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8")
            obj = json.loads(body)
            choice = (obj.get("choices") or [{}])[0]
            message = (choice.get("message") or {}).get("content", "")
            model_id = obj.get("model", model)
            snippet = message[:200].replace("\n", " ")
            print(f"[GLM] model={model_id} reply={snippet}...")
            return 0
    except urllib.error.HTTPError as e:
        try:
            err_body = e.read().decode("utf-8")
        except Exception:
            err_body = ""
        print(f"[错误] HTTP {e.code} {e.reason}. {('响应: ' + err_body[:200]) if err_body else ''}")
        return 1
    except Exception as e:
        print(f"[错误] 调用失败: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())