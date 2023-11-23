import fs from "fs";
import path from "path";

export async function POST(request) {
  const uploadDir = path.join(process.cwd(), "files");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const formData = await request.formData();
  const files = formData.getAll("files");

  files.forEach(async (file) => {
    const filePath = path.join(uploadDir, file.name);
    const writeStream = fs.createWriteStream(filePath);

    let fileBuff = await file.arrayBuffer();

    let fileBuffer = Buffer.from(fileBuff);

    writeStream.write(fileBuffer);
    writeStream.end();
  });

  return new Response(
    JSON.stringify({ message: "Files uploaded successfully" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
