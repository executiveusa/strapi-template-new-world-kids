import json


result = {
    "tool": "browser-harness",
    "step": "open-page",
}

info = open_visible_page("https://github.com/browser-use/browser-harness", settle_seconds=2.0)
result["page"] = snapshot_page_state("browser-harness")
result["heading"] = read_github_repository_heading()
result["screenshot"] = capture_named_screenshot("browser-harness-smoke.png", full=False)
result["loaded"] = bool(info.get("title"))

print(json.dumps(result))
