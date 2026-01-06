import 'zone.js/node';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = () => {
  console.log('--- SERVER BOOTSTRAP START ---');
  return bootstrapApplication(App, config);
};

export default bootstrap;
