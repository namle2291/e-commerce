const Product = require("../models/Product");
const slugify = require("slugify");

class productController {
    async getAll(req, res, next) {
        try {
            const queryObj = {
                ...req.query
            }
            // Loại một số trường ra khỏi request query
            const excludedFields = ['page', 'sort', 'limit', 'fields']
            excludedFields.forEach(el => delete queryObj[el])

            // Lọc nâng cao
            let queryString = JSON.stringify(queryObj)
            queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
            let query = Product.find(JSON.parse(queryString))

            // Sắp xếp
            if (req.query.sort) {
                const sortBy = req.query.sort.split(',').join(' ')
                query = query.sort(sortBy)
            }

            // Giới hạn một số trường
            if (req.query.fields) {
                const fields = req.query.fields.split(",").join(" ");
                query = query.select(fields);
            }

            // Phân trang
            // 1 2 3 4 5
            // (2 - 1) * 2
            let page = +req.query.page || 1; // thêm dấu + convert sang number
            let limit = +req.query.limit || 2; // thêm dấu + convert sang number
            let skip = (page - 1) * limit;

            query.skip(skip).limit(limit);

            const products = await query;

            const total = await Product.find(JSON.parse(queryString)).countDocuments();

            res.json({
                success: products ? true : false,
                total,
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
            const {
                title
            } = req.body;
            req.body.slug = slugify(title, {
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
            const {
                pid
            } = req.params;
            if (!pid) throw new Error("Missing product id!");

            if (Object.keys(req.body).length <= 0) throw new Error("Missing inputs!");
            // Tạo slug theo title
            const {
                title
            } = req.body;
            req.body.slug = slugify(title, {
                locale: 'vi',
            });

            const product = await Product.findByIdAndUpdate(pid, req.body, {
                new: true
            });

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
            const {
                pid
            } = req.params;
            if (!pid) throw new Error("Missing product id!");

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
            const {
                pid
            } = req.params;
            if (!pid) throw new Error("Missing product id!");

            const product = await Product.findOne({
                _id: pid
            });

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