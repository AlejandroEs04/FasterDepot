export const uploadImageToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gfvadegu");

    console.log("Hola buenas tardes")
  
    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dmap6p5wl/image/upload", {
            method: "POST",
            body: data,
        });

        console.log(response)
    
        const result = await response.json();
        return result.secure_url;
    } catch (error) {
        console.error("Error subiendo la imagen:", error);
        return null;
    }
};
  