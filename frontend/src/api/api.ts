import type { CategoryDto, DeleteImage, ImageDto, LoginDto, RegisterDto } from "@/interface";
import instance from ".";


export default {
    // Images
    // get images
    async getImagesByCategory() {
        return await instance.get("/Home/GetImagesByCategory")
    },
    // get images collection by category
    async getImagesByCategoryId(id: number) {
        return await instance.post("/Home/GetImagesByCategoryId", id)
    },
    // Save image
    async saveImage(data: ImageDto) {
        const formData = new FormData();
        formData.append("Title", data.title);
        formData.append("Slug", data.slug);
        formData.append("Description", data.description ?? '');
        formData.append("CategoryId", data.categoryId.toString());
        if (data.imageFile) {
            formData.append("ImageFile", data.imageFile);
        }
        return await instance.post("/Image/SaveImage", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    // Get all images
    async getAllImages() {
        return await instance.get("/Home/GetAllImages")
    },
    // Category
    // get category by id
    async getCategoryById(id: number) {
        return await instance.post("/Home/GetCategoryId", id)
    },
    // create category
    async createCategory(data: CategoryDto) {
        return await instance.post("/Image/CreateCategory", data)
    },
    // Get all categories
    async getAllCategories() {
        return await instance.get("/Image/GetAllCategories")
    },
    // create category
    async deleteImage(data: DeleteImage) {
        return await instance.post("/Image/DeleteImage", data)
    },
    // Auth 
    // Login
    async login(data: LoginDto) {
        return await instance.post("/Auth/login", data)
    },
    // Logout
    async logout() {
        return await instance.get("/Auth/logout")
    },
    // CheckAuthenticated
    async checkAuthenticated() {
        return await instance.get("/Auth/checkAuthenticated", { withCredentials: true })
    },
    // Register
    async register(data: RegisterDto) {
        return await instance.post("/Auth/register", data)
    },
}