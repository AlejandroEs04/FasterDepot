import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsOptions } from './config/cors'
import productRoutes from './routes/productRoutes'
import buyRoutes from './routes/buyRoutes'
import paypalRoutes from './routes/payPalRoutes'
import authRoutes from './routes/authRoutes'
import uploaderRoutes from './routes/uploaderRoutes'
import stripeRoutes from './routes/stripeRoutes'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(cors(corsOptions))

// Routes 
app.use('/products', productRoutes)
app.use('/checkout', paypalRoutes)
app.use('/checkoutStripe', stripeRoutes)
app.use('/buy', buyRoutes)
app.use('/auth', authRoutes)
app.use('/upload', uploaderRoutes)

export default app