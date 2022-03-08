import App from './ts/App';
import './sass/main.scss';

/**
 * Entry point.
 * 
 * Renders application through App.ts.
 * Imports style.
 * 
 * @author: Sofie Wallin
 */

const renderApp = async (): Promise<void> => {
    const app = new App();
    await app.render();
}

renderApp();
