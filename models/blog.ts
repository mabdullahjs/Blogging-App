import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        profileUrl: {
            type: String,
            required: true
        },
        uid: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;