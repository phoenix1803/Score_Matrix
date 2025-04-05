import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST() {
    try {
        const pythonScriptPath = path.join(process.cwd(), "lib", "reset_defaults.py");

        const pythonProcess = spawn("python", [pythonScriptPath]);

        pythonProcess.stdout.on("data", (data) => {
            console.log(`Python Output: ${data}`);
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python Error: ${data}`);
        });

        pythonProcess.on("close", (code) => {
            console.log(`Python process exited with code ${code}`);
        });

        return NextResponse.json({ message: "Python script triggered successfully!" });
    } catch (error) {
        console.error("Error triggering Python script:", error);
        return NextResponse.json({ error: "Failed to run Python script" }, { status: 500 });
    }
}
