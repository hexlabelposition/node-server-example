import http from "http";
import path from "path";
import fs from "fs/promises";

// Define server hostname and port or use environment variables
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
const PORT = process.env.PORT || 3000;

// Define paths for public directory
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Create HTTP server
const server = http.createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/") {
    try {
      // Handle request for the '/'
      const pagePath = path.join(PUBLIC_DIR, "index.html");
      const pageContent = await fs.readFile(pagePath, "utf-8");
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(pageContent);

      console.log(
        `${request.method} ${request.url} ${
          response.statusCode
        } - ${new Date().toLocaleTimeString()}`
      );

      // Try: http://127.0.0.1:3000/
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Internal Server Error" }));

      console.log(
        `${request.method} ${request.url} ${
          response.statusCode
        } - ${new Date().toLocaleTimeString()}`
      );
    }
  } else if (request.url === "/global.css") {
    // Handle request for global.css
    try {
      const cssPath = path.join(PUBLIC_DIR, "global.css");
      const cssContent = await fs.readFile(cssPath, "utf-8");
      response.writeHead(200, { "Content-Type": "text/css; charset=utf-8" });
      response.end(cssContent);

      console.log(
        `${request.method} ${request.url} ${
          response.statusCode
        } - ${new Date().toLocaleTimeString()}`
      );

      // Try: http://127.0.0.1:3000/global.css
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Internal Server Error" }));

      console.log(
        `${request.method} ${request.url} ${
          response.statusCode
        } - ${new Date().toLocaleTimeString()}`
      );
    }
  } else if (request.url === "/favicon.ico") {
    // Handle request for favicon.ico

    // To prevent unnecessary 404 errors in the console for favicon requests
    response.writeHead(204); // No Content
    console.log(
      `${request.method} ${request.url} ${
        response.statusCode
      } - ${new Date().toLocaleTimeString()}`
    );
    response.end();

    // Try: http://127.0.0.1:3000/favicon.ico
  } else if (request.url === "/favicon.svg") {
    try {
      const svgPath = path.join(PUBLIC_DIR, "favicon.svg");
      const svgContent = await fs.readFile(svgPath);
      response.writeHead(200, { "Content-Type": "image/svg+xml" });
      response.end(svgContent);

      console.log(
        `${request.method} ${request.url} ${
          response.statusCode
        } - ${new Date().toLocaleTimeString()}`
      );

      // Try: http://127.0.0.1:3000/favicon.svg
    } catch (error) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Internal Server Error" }));

      console.log(
        `${request.method} ${request.url} ${
          response.statusCode
        } - ${new Date().toLocaleTimeString()}`
      );
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not Found");

    console.log(
      `${request.method} ${request.url} ${
        response.statusCode
      } - ${new Date().toLocaleTimeString()}`
    );

    // Try: http://127.0.0.1:3000/not-found
  }
});

// Listen server on specified hostname and port
server.listen(PORT, HOSTNAME, async (error) => {
  // Handle server start error
  if (error) {
    console.error("Error occurred:", error);
    throw error;
  }

  // Log server start message
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

// Handle uncaught exceptions
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
});
