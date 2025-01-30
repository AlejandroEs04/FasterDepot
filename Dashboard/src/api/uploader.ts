import api from "../lib/axios"

export async function uploadProductImage(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const { data } = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data.imageUrl;
    } catch (error) {
        console.error(error);
        throw new Error('Error uploading image');
    }
}