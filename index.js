const { connectDB } = require("./Config/Database");
const app = require("./app");
connectDB();
app.listen(process.env.PORT , ()=>{
    console.log(` server is running on : http://localhost:${5000}`)
})