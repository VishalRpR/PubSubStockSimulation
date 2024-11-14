import { PubSubManager } from "./PubSubManager";


     setInterval(()=>{
         PubSubManager.getInstance().SubscribeStock(String(Math.random() * 1000), "apple")
    },5000)
