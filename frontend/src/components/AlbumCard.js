import React from "react";
import { Card, Rate, Button } from "antd";
import { UserOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import api from "../assets/api";

import { useHistory } from "react-router-dom";

const AlbumCard = props => {
  const history = useHistory();
  const addToFavorite = async () => {
    try {
      if (props.album.favorite) {
        const { data } = await axios.delete(
          `${api}album/delete/${props.album.id}`,
          {
            headers: { token: props.token }
          }
        );
      } else {
        const { data } = await axios.post(
          `${api}album/addFavorite`,
          { itemId: props.album.id, name: props.value },
          { headers: { token: props.token } }
        );
      }
      props.setValue("");
      props.init();
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <Card
      body
      title={props.album.title}
      bordered={true}
      style={{ width: 250 }}
      hoverable
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontSize: "15px"
        }}
      >
        <b>Add to Favorites</b>
        <Rate
          character={<HeartFilled />}
          defaultValue="0"
          value={props.album.favorite}
          allowClear
          style={{ color: "#a03f20", fontSize: "15px" }}
          count="1"
          tooltips={["Add album as favorite"]}
          onChange={addToFavorite}
        />
      </div>
      <p>
        {props.album.year} - {props.album.country}
      </p>
      {props.album.cover_image ? (
        <>
          <img
            src={props.album.cover_image}
            alt={props.album.title}
            style={{
              height: "150px",
              width: "150px",
              margin: "0 auto"
            }}
          />
        </>
      ) : (
        <UserOutlined />
      )}
      <Button
        type="button"
        album={props.album}
        onClick={() => {
          history.push({
            pathname: `/dashboard/albums/detail/${props.album.id}`,
            state: { album: props.album }
          });
        }}
      >
        Details
      </Button>
    </Card>
  );
};

export default AlbumCard;
