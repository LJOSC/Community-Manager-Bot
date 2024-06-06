import env from './configs/envVars';
import express from 'express';
import rootRouter from './routes';
import slackApp from './configs/slack';
import Logger from 'src/configs/logger';

const api = express();
const logger = new Logger('index.ts');

// Routes
api.use('/', rootRouter);

const PORT = env.EXPRESS_PORT;

// Start the Express server
api.listen(PORT, () => {
  logger.log(`⚡️ GitHub webhook server is running on port ${PORT}`);
});

// Initialize the slack app
(async () => {
  await slackApp.start(env.PORT);
  logger.log('⚡️ Slack Bolt app is running!');
})();
