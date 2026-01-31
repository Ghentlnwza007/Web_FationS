---
name: stitch-loop
description: Iteratively builds, verifies, and fixes UI components using Stitch and Browser tools until requirements are met.
---

# Stitch Self-Building Loop

This skill enables the agent to autonomously build, verify, and fix UI components in a loop.

## Usage

Use this skill when the user asks to "build", "implement", or "fix" a UI component and wants verification.

## Process (The Loop)

1.  **Analyze & Plan**
    - Read existing project files or design.md.
    - Determine the necessary changes in Stitch.

2.  **Implementation (Code)**
    - Use `stitch` MCP tools or file editing to apply changes.
    - Ensure the code includes necessary IDs or attributes for testing.

3.  **Verification (Browser Test)**
    - OPEN the `browser_subagent`.
    - NAVIGATE to the target page.
    - PERFORM user actions (Click, Type, Scroll).
    - CHECK for success criteria (Specific text, Element visibility, Data updates).

4.  **Self-Correction (The Loop Logic)**
    - **IF Verification FAILS:**
      - Analyze the browser screenshot/logs.
      - Modify the code to fix the issue.
      - **REPEAT Step 3 (Verification)** immediately.
    - **IF Verification PASSES:**
      - Finalize and report success to the user.

## Constraints

- Do not ask for user permission between the Fix -> Verify loop iterations.
- Limit retries to 5 attempts to prevent infinite loops.
