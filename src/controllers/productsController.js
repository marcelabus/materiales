const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render ('products', {'products': products, 'toThousand': toThousand});
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		let productIndex = products.map ( product => { return product.id }).indexOf(parseInt(req.params.id));
		
		res.render ('detail', {'productDetail': products [productIndex], 'toThousand': toThousand });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render ('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const newProduct = req.body;
		newProduct.id = parseInt (products.length + 1);
		products.push (newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect ('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productIndex = products.map ( product => { return product.id } ).indexOf ( parseInt (req.params.id));
		
		res.render ('product-edit-form', {'productToEdit': products [productIndex]});
	},
	
	// Update - Method to update
	update: (req, res) => {
		
		let productToEdit = req.body;

		productToEdit.id = req.params.id;
		
		let productIndex = products.map (product => { 
			return product.id }).indexOf(parseInt (req.params.id));

		products[productIndex] = productToEdit;

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		res.redirect ('/products');
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productIndex = products.map ( product => { return product.id } ).indexOf ( parseInt (req.params.id));
		
		products.splice (productIndex, 1);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		res.redirect ('/products');
	}
};

module.exports = controller;