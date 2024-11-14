import { createClient, RedisClientType } from "redis"

export class PubSubManager {

    public static instance: PubSubManager
    private subscription: Map<string, string[]>;
    private client:RedisClientType;

    private constructor() {
        this.client = createClient();
        this.client.connect();
        this.subscription = new Map();


    }
    public static getInstance() {
        if (PubSubManager.instance) {
            return PubSubManager.instance
        }

        PubSubManager.instance = new PubSubManager();
        return PubSubManager.instance
    }


    public SubscribeStock(userId: string, stock: string) {
       
            console.log(userId)
            if (!this.subscription.get(stock)) {
                this.subscription.set(stock, []);
                console.log("subscribed to" + stock)
            }
            this.subscription.get(stock)?.push(userId)
            console.log(this.subscription)
            if (this.subscription.get(stock)?.length == 1) {
                this.client.subscribe(stock, () => {
                    console.log("sending message to all users for this" + stock)
                })
            }
        

    }

    public UnsubscribeStock(userId: string, stock: string) {

        this.subscription.get(stock)?.filter(user => user !== userId)
        if (this.subscription.get(stock)?.length == 0) {
            this.client.unsubscribe(stock)
            console.log("unsubscribed to redis channel"+stock+"user"+userId)
        }

    }
}