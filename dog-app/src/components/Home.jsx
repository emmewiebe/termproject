import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [dogs, setDogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [favs, setFavs] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    const getRandomDogs = (dogArray, count) => {
        const shuffled = [...dogArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const searchDogs = () => {
        fetch('https://api.thedogapi.com/v1/breeds')
            .then((response) => response.json())
            .then((dogsArray) => {
                const filteredDogs = dogsArray.filter((loopDog) => {
                    return loopDog.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                });
                setDogs(filteredDogs);
            });
    };

    const toggleFav = (dogID) => {
        setFavs((prevFavs) => {
            if (prevFavs.includes(dogID)) {
                return prevFavs.filter((id) => id !== dogID);
            } else {
                return [...prevFavs, dogID];
            }
        });
    };

    useEffect(() => {
        localStorage.setItem("favs", JSON.stringify(favs));
    }, [favs]);

    useEffect(() => {
        fetch("https://api.thedogapi.com/v1/breeds")
            .then((response) => response.json())
            .then((dataObj) => {
                const randomDogs = getRandomDogs(dataObj, 10); // Display only 10 random dogs
                setDogs(randomDogs);
            })
            .catch((error) => {
                console.log("Error Fetching Dogs! SNIFF SNIFF", error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Dog Breeds</h1>
            <Link to="/favourites" className="nav-link">Go to Favourites</Link>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Search for a dog!"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button onClick={searchDogs}>Search</button>
            </div>
            <p style={{
                textAlign: "center",
                fontSize: "16px",
                color: "#333",
                marginBottom: "20px",
                fontStyle: "italic"
            }}>
                Here are 10 random dog breeds to get you started. Refresh the page for new choices!
            </p>
            <ul>
                {dogs.map((dog) => (
                    <li key={dog.id} className="breed-item">
                        <img
                            src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                            alt={dog.name}
                        />
                        <Link to={`/dog/${dog.id}`}>{dog.name}</Link>
                        <button onClick={() => toggleFav(dog.id)}>
                            {favs.includes(dog.id) ? "Remove Fav" : "Add Fav"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;