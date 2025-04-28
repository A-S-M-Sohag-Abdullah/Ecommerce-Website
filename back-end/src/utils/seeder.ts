import User from "../models/user.model";
import  Product  from "../models/product.model";
import  Order  from "../models/order.model";

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
