const getURLcloudinary = async (photoFile) => {
    const formData = new FormData();
    formData.append("file", photoFile);
    formData.append("upload_preset", "First_image_upload");
    formData.append("cloud_name", "db0myen6o");
    const res = await fetch("https://api.cloudinary.com/v1_1/db0myen6o/image/upload", {
        method: "POST",
        body: formData,
    })
    const uploadImageURL = await res.json();
    return uploadImageURL.url;
};

export default getURLcloudinary;