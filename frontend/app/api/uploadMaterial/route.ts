import fs from "fs";
import path from "path";
import { spawn } from "child_process";
export const runtime = "nodejs";

export async function POST(req: Request) {
    const chunks: Uint8Array[] = [];
    const reader = req.body?.getReader();

    if (!reader) {
        return new Response(
            JSON.stringify({ message: "No file data received" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    let done = false;
    while (!done) {
        const { value, done: readerDone } = await reader.read();
        if (value) {
            chunks.push(value);
        }
        done = readerDone;
    }

    const buffer = Buffer.concat(chunks);

    const materialsDir = path.join(process.cwd(), "public", "materials");
    if (!fs.existsSync(materialsDir)) {
        fs.mkdirSync(materialsDir, { recursive: true });
    }

    const fileName = `material_${Date.now()}.pdf`;
    const filePath = path.join(materialsDir, fileName);

    // Save the file to the public/materials directory
    fs.writeFileSync(filePath, buffer);

    const pythonScriptPath = path.join(process.cwd(), "lib", "process_material.py");

    const pythonProcess = spawn("python", [pythonScriptPath, filePath]);

    pythonProcess.stdout.on("data", (data) => {
        console.log(`Python Output: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python Error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        console.log(`Python process exited with code ${code}`);
    });

    return new Response(
        JSON.stringify({ path: `/materials/${fileName}`, message: "File uploaded Sucessfully!" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

export async function GET() {
    return new Response(
        JSON.stringify({ message: "GET not supported on this route" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
    );
}
