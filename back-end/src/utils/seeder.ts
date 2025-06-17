import User from "../models/user.model";
import Product from "../models/product.model";
import Order from "../models/order.model";
import axios from "axios";

export const seedDatabase = async () => {
  try {
    // Add dummy user
    const user = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123", // in real apps you must hash it!
    });

    console.log("Dummy User created:", user._id);

    // Add dummy product
    const product = await Product.create({
      name: "Test Product11",
      description: "This is a test product",
      price: 49.99,
      stock: 10,
    });

    console.log("Dummy Product created:", product._id);

    // Add dummy order
    const order = await Order.create({
      user: user._id,
      orderItems: [
        {
          product: product._id,
          quantity: 2,
        },
      ],
      totalPrice: 99.98,
      shippingAddress: {
        address: "123 Main St",
        city: "New York",
        postalCode: "10001",
        country: "USA",
      },
    });

    console.log("Dummy Order created:", order._id);

    console.log("✅ Dummy data inserted successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

export const importFakeProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    // Optional: Clear existing products
    await Product.deleteMany({});

    // 3. Map and save each product
    for (const item of products) {
      await Product.create({
        name: item.title,
        description: item.description,
        price: item.price,
        images: [item.image],
        category: item.category,
        countInStock: Math.floor(Math.random() * 50) + 1, // Random stock for demo
        rating: item.rating?.rate || 0,
        numReviews: item.rating?.count || 0,
      });
    }
    console.log("✅ Products imported successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing products:", error);
    process.exit(1);
  }
};
