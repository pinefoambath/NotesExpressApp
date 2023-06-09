import dotenv from "dotenv";
import { todoStore } from './services/todo-store.js';

(async () => {
    // load config-file
    dotenv.config({path: `.env${process.env.NODE_ENV ? `-${process.env.NODE_ENV}` : ''}`});

    // load app with current config
    const app = (await import('./app.js')).app;
    async function createTodos() {
        await todoStore.add("Pizza", 1, new Date(), "Order pizza", false);
        await todoStore.add("Beer", 2, new Date(), "Order beer", false);
        await todoStore.add("Finish assignment", 3, new Date(), "Finish web dev assignment", false);
      }
    createTodos();
    const hostname = '127.0.0.1';
    const port = 3001;
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
})() // https://github.com/wclr/ts-node-dev/issues/265
