const Product = require("../models/Product");
const slugify = require("slugify");

class productController {
    async getAll(req,res,next){
        try {
            const products = await Product.find();

            res.json({
                success: products ? true : false,
                data: products ? products : "Not data found!"
            })

        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");
            // Tạo slug theo title
            const {title} = req.body;
            req.body.slug = slugify(title,{
                locale: 'vi',
            });

            const product = await Product.create(req.body);

            res.json({
                success: true,
                product
            });
        } catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const {pid} = req.params;
            if(!pid) throw new Error("Missing product id!");

            if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");
            // Tạo slug theo title
            const {title} = req.body;
            req.body.slug = slugify(title, {
                locale: 'vi',
            });

            const product = await Product.findByIdAndUpdate(pid, req.body, {new:true});

            res.json({
                success: true,
                product
            });
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const {pid} = req.params;
            if(!pid) throw new Error("Missing product id!");

            const product = await Product.findByIdAndDelete(pid);

            res.json({
                success: true,
                message: product ? `Product ${product.title} deleted` : "Something went wrong!"
            });
        } catch (error) {
            next(error);
        }
    }
    async show(req, res, next) {
        try {
            const {pid} = req.params;
            if(!pid) throw new Error("Missing product id!");

            const product = await Product.findOne({_id: pid});

            res.json({
                success: true,
                product
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new productController;