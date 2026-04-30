import connectDB from "@/lib/connect";
import User from "@/lib/models/user";
import { comparePassword } from "./hash";


export async function getUserFromDb(email: string, password: string) {
    if (!email || !password) return null;

    await connectDB();

    const user = await User.findOne({ email }).lean();

    if (!user) return null;

    // ⚠️ إذا ماشي admin
    if (user.role !== "admin") return null;

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) return null;

    return {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    };
}