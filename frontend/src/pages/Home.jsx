import { useState, useEffect } from "react";
import api from "../api";
import Goal from "../components/Goal"
import "../styles/Home.css"

function Home() {
    const [goals, setGoals] = useState([]);
    const [about, setabout] = useState("");
    const [title, setTitle] = useState("");
    const [complete_by, setcomplete_by] = useState('')
    useEffect(() => {
        getGoals();
    }, []);

    const getGoals = () => {
        api
            .get("/api/goals/") //failing
            .then((res) => res.data)
            .then((data) => {
                setGoals(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deleteGoal= (id) => {
        api
            .delete(`/api/goals/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Goal deleted!");
                else alert("Failed to delete goal.");
                getGoals();
            })
            .catch((error) => alert(error));
    };

    const createGoal = (e) => {
        e.preventDefault();
        api
            .post("/api/goals/", { title, about, complete_by})
            .then((res) => {
                if (res.status === 201) alert("Goal created!");
                else alert("Failed to make Goal.");
                getGoals();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h2>Goals</h2>
                {goals.map((goal) => (
                    <Goal goal={goal} onDelete={deleteGoal} key={goal.id} />
                ))}
            </div>
            <h2>Create a Goal</h2>
            <form onSubmit={createGoal}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="about">about:</label>
                <br />
                <textarea
                    id="about"
                    name="about"
                    required
                    value={about}
                    onChange={(e) => setabout(e.target.value)}
                ></textarea>
                <label htmlFor="date">Complete By:</label>
                <br />
                <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    onChange={(e) => setcomplete_by(e.target.value)}
                    value={complete_by}
                />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;