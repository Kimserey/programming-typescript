import * as e from "express";

const app = e();
const port = process.env.PORT || 3000;

app.use((_: e.Request, res: e.Response) => {
  res.type("text/plain");
  res.status(404);
  res.send("Not Found");
});

app.use((err: any, req: e.Request, res: e.Response, next: e.NextFunction) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("Server Error");
});

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`);
  console.log("Press CTRL+C to terminate.");
});
