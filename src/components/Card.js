import React from "react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Card = ({ item, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("starter")
      .delete()
      .eq("id", item.id)
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(item.id);
    }
  };
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p>{item.method}</p>
      <div className="rating">{item.rating}</div>
      <div className="buttons">
        <Link to={`/${item.id}`}>
          <i>edit</i>
        </Link>
        <i onClick={handleDelete}>delete</i>
      </div>
    </div>
  );
};

export default Card;
