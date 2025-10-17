const bcrypt = require("bcryptjs");

const hashed = "$2b$10$4slwheGe3OjiMy/iElllSOv24Fp0Cy8br5.xVvmuZQNZc2JcS1ga.";

async function test() {
  const result = await bcrypt.compare("123456", hashed);
  console.log("Password match?", result); // should print: true
}

test();
