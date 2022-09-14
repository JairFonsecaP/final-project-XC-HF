import React from "react";
import { Card, Rate } from "antd";
import { UserOutlined, HeartFilled } from "@ant-design/icons";

const addToFavorite = async () => {
  try {
    const { data } = await axios.get(`${api}album/getAlbum/${value}`, {
      headers: { token: props.token }
    });
    console.log(data);
    props.setList(data);
  } catch (e) {}
};

const AlbumCard = props => {
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
          onClick={addToFavorite}
        />
      </div>
      {props.album.cover_image !== "" ? (
        <>
          <p>
            {props.album.year} - {props.album.country}
          </p>
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
    </Card>
  );
};

export default AlbumCard;
