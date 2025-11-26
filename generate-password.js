// 生成密码哈希的脚本
const { hashPassword } = require('./dist/backend/utils/hash');

async function main() {
  try {
    const hash = await hashPassword('admin123');
    console.log('Generated password hash:', hash);
  } catch (error) {
    console.error('Error generating password hash:', error);
  }
}

main();
