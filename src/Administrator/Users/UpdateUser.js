import React, { useState } from "react";

function UploadImage() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert("Por favor selecciona una imagen");
      return;
    }
  
    try {
      console.log("Subiendo archivo:", image.name);
  
      // Solicitar la URL firmada
      const fileName = encodeURIComponent(image.name);
      const signedUrlResponse = await fetch(
        `http://localhost:5000/generate-signed-url?fileName=${fileName}`
      );
  
      if (!signedUrlResponse.ok) {
        throw new Error(`Error en la solicitud de URL firmada: ${signedUrlResponse.status}`);
      }
  
      const { signedUrl } = await signedUrlResponse.json();
      console.log("URL firmada obtenida:", signedUrl);
  
      // Subir la imagen usando la URL firmada
      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": image.type || "application/octet-stream",
        },
        body: image,
        mode: "no-cors",
      });
  
      if (!uploadResponse.ok) {
        const errorDetails = await uploadResponse.text();
        console.error("Error al cargar la imagen:", errorDetails);
        throw new Error(`Error al cargar la imagen: ${uploadResponse.status}`);
      }
  
      alert("Imagen cargada con éxito");
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      alert("Error al procesar la imagen: " + error.message);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Subir Imagen</button>
      </form>
    </div>
  );
}

export default UploadImage;
