const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		res.render ('index', {'products': products, 'toThousand': toThousand });
	},
	search: (req, res) => {
		let searchKeywords = req.query.keywords;
		let searchResult = products.filter (product => {
			return product.name.toLowerCase().includes (searchKeywords.toLowerCase());
		});
		res.render ('results', {'products':searchResult});
	},
};

module.exports = controller;
