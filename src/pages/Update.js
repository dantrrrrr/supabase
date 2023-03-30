import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !method || !rating) {
      setFormError("Please fill in  all the fields correctly ");
      return;
    }
    const { data, error } = await supabase
      .from("starter")
      .update({
        title,
        method,
        rating,
      })
      .eq("id", id).select();
    if (error) {
      console.log(error);
      setFormError("Please fill in  all the fields correctly ");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate(`/`);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("starter")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };
    fetchData();
  }, [id, navigate]);

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="method">Method: </label>
        <textarea
          type="text"
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating: </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>create new starter row</button>
        {/* <input type="submit" value="" placeholder="new" /> */}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
