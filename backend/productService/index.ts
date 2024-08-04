import express, {Request, Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product  from './ProductModel';
import cookieParser from 'cookie-parser';
import { addToCartEvent } from './productProducer';
import authentication from './authentication';

const app = express()
app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))

mongoose.connect('mongodb://localhost:27017/kafka-product')
    .then(()=> {
        console.log('Connected to Mongodb')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:',error)
    })


app.post('/add-products',authentication, async(req:Request, res:Response) => {
    const { name, price} = req.body;

    console.log(req.body,"hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    
    const newProduct = new Product({ name, price})

    try {
        const product = await newProduct.save()
        res.status(200).send(product)
    } catch (error) {
        console.error(error);
        res.status(500).send({error: 'Error creating products'})
        
    }
})

app.get('/products',authentication, async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching products' });
    }
  });

  app.post('/add-to-cart',authentication, async(req: Request, res: Response) => {
    const { userId, productId } = req.body;

    console.log(req.body);
    

    try {
        const product = await Product.findById(productId)

        console.log(product,"prdcttt")

        if( !product) {

            console.log('new prct added');
            
            return res.status(404).send({error: 'Product not found'})
        }

        addToCartEvent(product,userId)

        res.status(200).send('successfully added to cart')
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send({ error: "Error adding to cart" });
    }
  })

  const PORT = 4001;
app.listen(PORT, () => {
  console.log(`user-service is running on port ${PORT}`);
});