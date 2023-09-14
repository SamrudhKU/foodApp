const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://foodie:12345@cluster0.kbzuyxy.mongodb.net/foodiemern?retryWrites=true&w=majority'
// const mongoURI = 'mongodb://foodie:12345@ac-ff4ye9o-shard-00-00.kbzuyxy.mongodb.net:27017,ac-ff4ye9o-shard-00-01.kbzuyxy.mongodb.net:27017,ac-ff4ye9o-shard-00-02.kbzuyxy.mongodb.net:27017/foodiemern?ssl=true&replicaSet=atlas-m97ekr-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_Items");
            fetched_data.find({}).toArray(async function(err, data){
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err, catData){
                    if(err) console.log(err);
                    else{
                        global.food_items = data;
                        global.foodCategory = catData;   
                    }
                })
                // if(err) console.log(err);
                // else {
                //     global.food_items = data;
                // }
            })
        }
    });
}
module.exports = mongoDB;

