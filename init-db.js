const { initDatabase } = require('./dist/server/utils/initDatabase');

async function setup() {
  try {
    console.log('🚀 Инициализация базы данных...');
    await initDatabase();
    console.log('✅ База данных инициализирована успешно!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка инициализации:', error.message);
    process.exit(1);
  }
}

setup();
