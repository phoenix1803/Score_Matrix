import fs from "fs";
import path from "path";
export const runtime = "nodejs";

const materialsDir = path.join(process.cwd(), "public", "materials");

export async function GET() {
    try {
        // Check if the directory exists
        if (!fs.existsSync(materialsDir)) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Read all files in the directory
        const files = fs.readdirSync(materialsDir);

        // Map files to their URLs
        const materials = files.map((file) => ({
            id: file,
            name: file,
            path: `/materials/${file}`,
            uploadedAt: fs.statSync(path.join(materialsDir, file)).mtime.toISOString(),
        }));

        return new Response(JSON.stringify(materials), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching materials:", error);
        return new Response(JSON.stringify({ message: "Error fetching materials" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
