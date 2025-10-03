import server from "./server.js";
import colors from "colors";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(colors.green(`🚀 Server running at http://localhost:${PORT}`));
});
