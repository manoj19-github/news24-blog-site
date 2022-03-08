
import mongoose from "mongoose";

// windows is available in browser
// like windows we have global variable in node env


global.mongoose = {
    conn: null,
    promise: null
}

export async function dbConnect(){

    if(global.mongoose && global.mongoose.conn){
        console.log('Using Existing mongoose connection');
        return global.mongoose.conn;
    }else{
        console.log('Creatnig new mongoose connection');
  
        const promise = mongoose.connect(process.env.NEXT_PUBLIC_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        }).then(mongoose => mongoose);

        global.mongoose = {
            conn: await promise,
            promise
        }

        return await promise;

    }

}
