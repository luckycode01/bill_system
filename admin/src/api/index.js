let proxy = "";

if (process.env.NODE_ENV === "development") {
  proxy = "/api/api/lucky";
}

if (process.env.NODE_ENV === "production") {
  proxy = "/api/lucky";
}

export { proxy };
