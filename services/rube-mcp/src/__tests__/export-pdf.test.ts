import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app } from "../server";

const parseBuffer = (res: NodeJS.ReadableStream, cb: (err: Error | null, body?: Buffer) => void) => {
  const data: Buffer[] = [];
  res.on("data", (chunk) => data.push(Buffer.from(chunk)));
  res.on("end", () => cb(null, Buffer.concat(data)));
  res.on("error", (error) => cb(error));
};

test("exports notebook as PDF", async () => {
  const createResponse = await request(app)
    .post("/notebooks")
    .send({
      title: "Sample Notebook",
      sources: [
        {
          id: "source-1",
          title: "Intro",
          content: "Notebook source content.",
          type: "text",
          createdAt: new Date().toISOString(),
        },
      ],
    });

  assert.equal(createResponse.status, 200);
  const notebookId = createResponse.body.notebookId as string;
  assert.ok(notebookId);

  const exportResponse = await request(app)
    .get(`/notebooks/${notebookId}/export?format=pdf`)
    .buffer(true)
    .parse(parseBuffer);

  assert.equal(exportResponse.status, 200);
  assert.match(exportResponse.headers["content-type"], /application\/pdf/);
  assert.match(exportResponse.headers["content-disposition"], /filename=".*\.pdf"/);
  assert.ok(Buffer.isBuffer(exportResponse.body));
  assert.ok(exportResponse.body.length > 100);
});
