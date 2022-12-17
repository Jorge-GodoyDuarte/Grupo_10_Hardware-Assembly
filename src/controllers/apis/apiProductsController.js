const { literal, Op } = require('sequelize');
const path = require('path');
const db = require('../../database/models');
const { sendSequelizeError } = require('../../helpers');

module.exports = {
    list: async (req, res) => {

		try {

			let {limit = 4, page = 1, order = 'ASC', sortBy = 'id', search = "", sale = 0} = req.query;

			/* paginación */
			limit = limit > 16 ? 16 : +limit;
			page = +page;
			let offset = +limit * (+page - 1);

			/* ordenamiento */
			order = ['ASC','DESC'].includes(order.toUpperCase()) ? order : 'ASC';
			sortBy =  ['id','name', 'price', 'discount', 'categories_id', 'brand_id', 'newest'].includes(sortBy.toLowerCase()) ? sortBy : 'id';

			let orderQuery = sortBy === "categories_id" ? ['categories_id','name',order] : sortBy === "newest" ? ['createdAt', 'DESC'] : [sortBy, order]

			let options = {
				/* subQuery:false, */
				limit,
                distinct: true,
				offset,
				order : [orderQuery],
				include : [
					{
						association : 'images',
						attributes : {
							exclude : ['createdAt','updatedAt', 'deletedAt', 'id', 'file', 'productId'],
							include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/image/',file)`),'url']]
						},
					},
					{
						association : 'category',
						attributes : ['name','id'],
						
					},
                    {
						association : 'brand',
						attributes : ['name','id'],
						
					}
				],
				attributes : {
					exclude : ['updatedAt','deletedAt'],
					include : [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/',Product.id)`),'url']]
				},
				where : {
					[Op.or] : [
						{
							name : {
								[Op.substring] : search
							}
						},
						{
							description : {
								[Op.substring] : search
							}
						},
					/* 	{
							"$category.name$" : {
								[Op.substring] : search
							}
						} */
					],
					[Op.and] : [
						{
							discount : {
								[Op.gte] : sale
							}
						}
					]
				}
				
			
			}

			const {count, rows : products} = await db.Product.findAndCountAll(options);


			const queryKeys = {
				limit,
				order,
				sortBy,
				search,
				sale
			}

			let queryUrl = "";

			for (const key in queryKeys) {

				queryUrl += `&${key}=${queryKeys[key]}`
			
			}


			const existPrev = page > 1;
			const existNext = offset + limit < count;

			const prev =  existPrev ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page - 1}${queryUrl}` : null;
			const next = existNext ? `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 1}${queryUrl}` : null;

			return res.send.status(200).json({
				ok : true,
				meta : {
					total : count,
					quantity : products.length,
					page,
					prev, 
					next
				},
				data : products
			})


		} catch (error) {
			let errors = sendSequelizeError(error);

            return res.status(error.status || 500).json({
                ok: false,
                errors,
            });
		}

	}
}