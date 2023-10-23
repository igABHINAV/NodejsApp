const Item = require("../../Models/Item")
const User = require("../../Models/User");
const Order = require("../../Models/Order");


//The Seller can add items in it's catalog
exports.AddItem = async (req, res) => {
    try {
        const { List } = req.body;
        const user = await User.findById(req.user._id);
        if (user.type !== "Seller") {
            return res.status(401).json({
                message: "You aren't a seller!",
            });
        }

        const itemPromises = List.map(async (items) => {
            const data = {
                name: items.name,
                price: items.price,
            };
            const item = await Item.create(data);
            user.catalog.push(item._id);
            return item;
        });

        const createdItems = await Promise.all(itemPromises);

        try {
            await user.save();
        } catch (error) {
            console.log(`Error updating user catalog array:`, error);
        }

        return res.status(201).json({
            message: "Items added successfully in catalog",
            items: createdItems, // You can send the created items in the response if needed.
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};



//Buyers can get a list of all the sellers along with their catalog
exports.getAllSellers = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user && user.type === "Buyer") {
            const sellers = await User.find({ type: "Seller" }).populate('catalog');
            res.status(200).json({
                success: true,
                sellers: sellers,
            });
        } else {
            res.status(401).json({
                success: false,
                message: "You are not authorized to view the list of sellers.",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};



//buyers can view the seller's catalog by passing their id in parameters
exports.viewSellerCatalog = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const user = await User.findById(req.user._id);
        if (user && user.type === "Buyer") {
            const seller = await User.findById(sellerId);

            if (!seller || seller.type !== "Seller") {
                return res.status(404).json({
                    success: false,
                    message: "Seller not found or invalid seller ID.",
                });
            }

            // Populate the seller's catalog, not all sellers' catalogs
            await seller.populate('catalog').execPopulate();

            res.status(200).json({
                success: true,
                catalog: seller.catalog, // Send the catalog of the specific seller
            });
        } else {
            res.status(401).json({
                success: false,
                message: "You are not authorized to view the catalog of this seller.",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};




exports.getSellerOrders = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user || user.type !== "Seller") {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to view your orders.",
            });
        }

        const orders = await Order.find({ seller: req.user._id });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const { seller_id } = req.params;
        const user = await User.findById(req.user._id);
        if (!user || user.type !== "Buyer") {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to create an order.",
            });
        }

        const order = await Order.create({ buyer: user._id, seller: seller_id, items: items });

        // Use push to add the new order to the cart array
        user.cart.push(order._id);

        await user.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};



