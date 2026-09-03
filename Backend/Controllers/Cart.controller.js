import User from "../Models/UserModel.js";

// Add a product to the authenticated user's cart.
export const addCart = async (req, res) => {
const {userId,itemId,size}=req.body;
console.log("addCart called with:", { userId, itemId, size });
try{
    const userData = await User.findById(userId);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }
    let cartData=await userData.cardData;
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1;
        }
        else{
            cartData[itemId][size]=1;
        }
    }
    else{
        cartData[itemId]={};
        cartData[itemId][size]=1;
    }
    await User.findByIdAndUpdate(userId,{cardData:cartData});
    return res.status(200).json({ message: "Product added to cart" });
}
catch(error){
    return res.status(500).json({ message: error.message });

}
}
// Update or remove a product from the authenticated user's cart.
export const updateCart = async (req, res) => {
	const {userId,itemId,size,quantity } = req.body;
    try {
          const userData = await User.findById(userId);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }
    let cartData=await userData.cardData;
    cartData[itemId][size]=quantity;
await User.findByIdAndUpdate(userId,{cardData:cartData});
    return res.status(200).json({ message: "Cart updated successfully" });
        }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all products in the authenticated user's cart.
export const getCart = async (req, res) => {
	try {
	const {userId} = req.body;
    const userData = await User.findById(userId);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }
    const cartData = await userData.cardData;
    return res.status(200).json({ cartData });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};