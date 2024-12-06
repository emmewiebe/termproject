import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Favourites() {
    const [savedDogs, setSavedDogs] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    const [favDogs, setFavDogs] = useState([]);

    useEffect(() => {
        fetch("https://api.thedogapi.com/v1/breeds")
            .then((response) => response.json())
            .then((dogs) => {
                const favDogs = dogs.filter((allDog) => savedDogs.includes(allDog.id));
                setFavDogs(favDogs);
            });
    }, [savedDogs]);

    // Function to remove a dog from favorites
    const removeFromFavorites = (dogID) => {
        const updatedFavs = savedDogs.filter((id) => id !== dogID); // Remove the dog ID from the saved list
        setSavedDogs(updatedFavs); // Update the local state
        localStorage.setItem("favs", JSON.stringify(updatedFavs)); // Update localStorage
        setFavDogs((prevFavDogs) => prevFavDogs.filter((dog) => dog.id !== dogID)); // Update displayed favorite dogs
    };

    return (
        <div className="container">
            <h1>These are my favourite dogs!</h1>
            <Link to="/" className="nav-link">Return to Home</Link>
            <ul>
                {favDogs.map((dog) => (
                    <li key={dog.id} className="breed-item">
                        <img
                            src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                            alt={dog.name}
                        />
                        <Link to={`/dog/${dog.id}`}>{dog.name}</Link>
                        <button
                            onClick={() => removeFromFavorites(dog.id)}
                            style={{
                                backgroundColor: "#FF5C5C",
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "5px",
                                marginTop: "10px",
                                cursor: "pointer"
                            }}
                        >
                            Remove from Favourites
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Favourites;