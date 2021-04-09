const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

const Product = require('./models/Product')

mongoose.connect('mongodb://localhost:27017/tic', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => console.log('Connected to database!'))
    .catch((error) => console.log(error))

app.use(cors())
app.use(express.json())

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'No resources found.'
            })
        }

        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const { name, image_url, category } = req.body
        const { success, message } = validateRequest(req.body)
        if (!success) {
            return res.status(400).json({
                success: false,
                message
            })
        }
        
        const product = await Product.create({
            name,
            image_url,
            category
        })
        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Unknown error occured.'
            })
        }

        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
    }
})

function validateRequest({ name, image_url, category }) {
    if (!name || !name.trim().length) {
        return {
            success: false,
            message: 'Name field is required.'
        }
    }

    if (!image_url || !image_url.trim().length) {
        return {
            success: false,
            message: 'Image URL is required.'
        }
    }

    if (!category || !category.trim().length) {
        return {
            success: false,
            message: 'Category field is required.'
        }
    }

    return {
        success: true,
        message: 'Validation passed.'
    }
}

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))