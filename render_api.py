#!/usr/bin/env python3
"""
Render API helper for travelsim/applekidswatch.

Usage:
  python3 render_api.py list                            -- list all services
  python3 render_api.py create                          -- create applekidswatch web service
  python3 render_api.py trigger_deploy <service_id>     -- trigger new deploy
  python3 render_api.py update_env <id> <key> [value]   -- set env var

Prerequisites:
  - RENDER_TOKEN environment variable (Render API key)
  - RENDER_OWNER_ID environment variable (Render team/owner ID, prefixed with tea-)
"""

import urllib.request, json, os, sys

RENDER_TOKEN = os.environ.get("RENDER_TOKEN", "") or os.environ.get("RENDER_API_KEY", "")
OWNER_ID = os.environ.get("RENDER_OWNER_ID", "")

if not RENDER_TOKEN or not OWNER_ID:
    print("ERROR: Set RENDER_TOKEN and RENDER_OWNER_ID env vars", file=sys.stderr)
    print("  RENDER_TOKEN: Render API key from https://dashboard.render.com/api", file=sys.stderr)
    print("  RENDER_OWNER_ID: Your team/user ID (tea-xxx), from Render dashboard URL", file=sys.stderr)
    sys.exit(1)

RENDER_API = "https://api.render.com/v1"
headers = {
    "Authorization": f"Bearer {RENDER_TOKEN}",
    "Content-Type": "application/json",
}

action = sys.argv[1] if len(sys.argv) > 1 else "help"

def list_services():
    req = urllib.request.Request(f"{RENDER_API}/services", headers=headers)
    with urllib.request.urlopen(req) as resp:
        services = json.loads(resp.read())
    if not services:
        print("No services found")
    else:
        for s in services:
            svc = s.get("service", {})
            sid = svc.get("id", "?")
            name = svc.get("name", "?")
            repo = svc.get("repo", "?")
            branch = svc.get("branch", "?")
            url = svc.get("url", "?")
            print(f"{name} ({sid})")
            print(f"  repo: {repo}")
            print(f"  branch: {branch}")
            print(f"  url: {url}")

def create_web_service():
    print("Creating applekidswatch web service...")
    payload = {
        "type": "web_service",
        "name": "applekidswatch",
        "ownerId": OWNER_ID,
        "repo": "https://github.com/travelsim/applekidswatch",
        "branch": "main",
        "autoDeploy": "yes",
        "serviceDetails": {
            "runtime": "node",
            "plan": "starter",
            "envSpecificDetails": {
                "buildCommand": "npm install && npm run build",
                "startCommand": "npm run start",
            },
        },
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        f"{RENDER_API}/services",
        data=body,
        headers=headers,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"Created! Status: {resp.status}")
            data = json.loads(resp.read())
            svc = data.get("service", data)
            print(f"ID: {svc.get('id')}")
            print(f"Name: {svc.get('name')}")
            print(f"URL: {svc.get('url')}")
            print(f"Status: {svc.get('status')}")
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        print(f"HTTP {e.code}: {err[:1500]}")

def trigger_deploy(service_id):
    deploy_payload = {"clearRepoCache": True}
    body = json.dumps(deploy_payload).encode("utf-8")
    req = urllib.request.Request(
        f"{RENDER_API}/services/{service_id}/deploys",
        data=body,
        headers=headers,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read()
            try:
                data = json.loads(raw)
            except json.JSONDecodeError:
                print(f"Deploy triggered (non-JSON). Status: {resp.status}")
                return
            deploy = data.get("deploy", data)
            print(f"Deploy triggered! ID: {deploy.get('id')}, Status: {deploy.get('status')}")
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode()[:1000]}")

def update_env_var(service_id, key, value=""):
    env_payload = {"key": key, "value": value}
    body = json.dumps(env_payload).encode("utf-8")
    req = urllib.request.Request(
        f"{RENDER_API}/services/{service_id}/env-vars",
        data=body,
        headers=headers,
        method="PUT",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"Env var {key} set on {service_id}")
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode()[:500]}")

def show_help():
    print(f"Usage: {sys.argv[0]} <action> [args]")
    print("Actions:")
    print("  list                              - List all Render services")
    print("  create                            - Create applekidswatch web service")
    print("  trigger_deploy <service_id>        - Trigger a new deploy")
    print("  update_env <id> <key> [value]     - Set an env var")
    print()
    print("Dashboard setup (if API unavailable):")
    print("  1. Go to https://dashboard.render.com")
    print("  2. New + > Web Service")
    print("  3. Connect GitHub repo: travelsim/applekidswatch")
    print("  4. Settings:")
    print("     - Name: applekidswatch")
    print("     - Runtime: Node")
    print("     - Build Command: npm install && npm run build")
    print("     - Start Command: npm run start")
    print("     - Plan: Starter (free)")
    print("  5. Add env vars:")
    print("     - NODE_ENV: production")
    print("     - SESSION_SECRET: (generate one)")
    print("     - DATABASE_URL: (your Postgres URL)")

# Dispatch
if action == "list":
    list_services()
elif action == "create":
    create_web_service()
elif action == "trigger_deploy" and len(sys.argv) > 2:
    trigger_deploy(sys.argv[2])
elif action == "update_env" and len(sys.argv) > 3:
    update_env_var(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else "")
else:
    show_help()
