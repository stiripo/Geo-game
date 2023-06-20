import { createServer} from "miragejs";

createServer({
    routes() {
        this.get('/api/stats', () => {
            return JSON.stringify("Nobody has played this game so far");
        })

        this.passthrough();
    }
})

export default createServer;