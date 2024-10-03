import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const query = request.nextUrl.searchParams.get("query")
    // Replace the uri string with your connection string.
    const uri = "mongodb+srv://nilesh-geeks:Qwerty123@cluster.wwi2r.mongodb.net/";
    const client = new MongoClient(uri);
    try {
        const database = client.db('Databse');
        const inventory = database.collection('stock_management');

        // const products = await inventory.aggregate([{
        //     $match: {
        //         $or: [
        //             { slug: { $regex: query, $options: "i" } }, // Partial matching for name field
        //             { price: { $regex: query, $options: "i" } }, // Partial matching for name field
        //             { quantity: { $regex: query, $options: "i" } }, // Partial matching for name field
        //         ]
        //     }
        // }
        // ]).toArray()

        const products = await inventory.aggregate([
            {
                $match: {
                    $or: [
                        { slug: { $regex: query, $options: "i" } }, // Partial matching for slug (string)
                        {
                            price: {
                                $eq: parseFloat(query) // Exact matching for price (number)
                            }
                        },
                        {
                            quantity: {
                                $eq: parseInt(query, 10) // Exact matching for quantity (number)
                            }
                        },
                    ]
                }
            }
        ]).toArray()

        return NextResponse.json({ success: true, products })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

}



