require('dotenv').config();

const mysqldump = require('mysqldump');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const config = require('./config.json');

const BACKUP_DIR = process.env.BACKUP_DIR || path.resolve(__dirname, 'backups');

const getLogDirName = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}`;
};

const LOGS_PATH = path.join(__dirname, 'logs', getLogDirName());
const LOG_FILE_PATH = path.join(LOGS_PATH, 'backup-log.txt');

const writeLog = (message) => {
  try {
    if (!fs.existsSync(LOGS_PATH)) {
      fs.mkdirSync(LOGS_PATH, { recursive: true });
    }
    const logMessage = `[${new Date().toLocaleString()}] ${message}\n`;
    fs.appendFileSync(LOG_FILE_PATH, logMessage);
  } catch (err) {
    console.error(`Falha ao escrever no log:`, err);
  }
};

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const backup = async () => {
  writeLog('Iniciando rotina de backup...');

  for (const dbName of config.databases) {
    const date = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${dbName}-${date}.sql`;
    const filePath = path.join(BACKUP_DIR, fileName);

    writeLog(`Iniciando backup do banco de dados: ${dbName}`);

    try {
      await mysqldump({
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: dbName,
        },
        dumpToFile: filePath,
      });
      writeLog(`Backup de ${dbName} concluído com sucesso!`);
    } catch (err) {
      writeLog(`ERRO ao fazer backup de ${dbName}: ${err.message}`);
    }
  }

  writeLog('Rotina de backup finalizada.');
};

if (config.runImmediately) {
  (async () => {
    await backup();
  })();
} else if (config.schedule.enabled) {
  cron.schedule(config.schedule.cronExpression, backup);
  writeLog(`Backup agendado para: ${config.schedule.cronExpression}`);
}