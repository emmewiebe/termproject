import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DogDetails() {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [images, setImages] = useState([]); // State for multiple images

    useEffect(() => {
        // Fetch the dog's details
        fetch("https://api.thedogapi.com/v1/breeds")
            .then((response) => response.json())
            .then((dataObj) => {
                const selectedDog = dataObj.find((dog) => dog.id === parseInt(id));
                setDog(selectedDog);

                // Fetch multiple images using the reference_image_id
                if (selectedDog?.reference_image_id) {
                    fetch(
                        `https://api.thedogapi.com/v1/images/search?breed_ids=${selectedDog.id}&limit=5`
                    )
                        .then((response) => response.json())
                        .then((images) => {
                            setImages(images);
                        })
                        .catch((error) => console.error("Error fetching images:", error));
                }
            })
            .catch((error) => console.error("Error fetching dog details:", error));
    }, [id]);

    if (!dog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{dog.name}</h1>
            {/* Display multiple images at the top */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap"
            }}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={dog.name}
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                        }}
                    />
                ))}
            </div>
            <div style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center"
            }}>
                <p><strong>Temperament:</strong> {dog.temperament}</p>
                <p><strong>Bred For:</strong> {dog.bred_for}</p>
                <p><strong>Life Span: </strong>{dog.life_span}</p>
                <Link to="/" className="nav-link">Return to Home</Link>
            </div>
        </div>
    );
}

export default DogDetails;