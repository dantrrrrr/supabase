import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import Card from "../components/Card";

const Home = () => {
  // console.log(supabase)
  const handleDelete = (id) => {
    setStarter((prevStarter) => prevStarter.filter((item) => item.id !== id));
  };
  const [fetchError, setFetchError] = useState(null);
  const [starter, setStarter] = useState(null);
  const [order, setOrder] = useState("created_at");
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("starter")
        .select()
        .order(order, { asc: false });
      if (error) {
        setFetchError("Could not fetch data from Starter ");
        setStarter(null);

        console.log(error);
      }
      if (data) {
        setStarter(data);
        setFetchError(null);
      }
    };
    fetchData();
  }, [order]);
  return (
    <div className="page home">
      {fetchError && <h2>{fetchError}</h2>}
      {starter && (
        <div className="starter">
          <div className="order-by">
            <p>Order by :</p>
            <button onClick={() => setOrder("created_at")}>Time create</button>
            <button onClick={() => setOrder("title")}>Title</button>
            <button onClick={() => setOrder("rating")}>Rating</button>
            {order}
          </div>
          <div className="starter grid">
            {starter.map((item) => (
              <Card key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
