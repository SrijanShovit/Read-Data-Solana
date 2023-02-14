import { clusterApiUrl } from "@solana/web3.js";
import fetch from "node-fetch";

async function getBalanceUsingJSONRPC(address) {
    try {
        const url = clusterApiUrl('devnet');
        console.log(url);
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getBalance",
                "params": [
                    address
                ]
            })
        });
        console.log(await res.json());
    } catch (error) {
        console.log(error);
    }

}

getBalanceUsingJSONRPC("7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp");

/**
OP:

https://api.devnet.solana.com
{
  jsonrpc: '2.0',
  result: {
    context: { apiVersion: '1.14.13', slot: 195560481 },
    value: 614277760
  },
  id: 1
}
 */