import React from "react";
import { Card, Rate, Button, Row, Col, Divider } from "antd";
import { UserOutlined, HeartFilled, HeartTwoTone } from "@ant-design/icons";
import axios from "axios";
import api from "../assets/api";

import { useHistory } from "react-router-dom";

const AlbumCard = props => {
  const style = {
    padding: "8px 0"
  };
  const history = useHistory();
  const addToFavorite = async () => {
    props.setErrors([]);
    props.setLoading(true);
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
    } catch (e) {
      if (e.response.data.errors) {
        props.setErrors(e.response.data.errors);
      } else {
        props.setErrors(e.message);
      }
    } finally {
      props.setLoading(false);
      props.init();
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
      <Divider orientation="left"></Divider>
      <Row>
        <Col span={8}>
          <div style={style}>
            <Button
              type="primary"
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
          </div>
        </Col>
        <Col span={6} offset={10}>
          <div style={style}>
            <Rate
              character={
                props.album.favorite ? (
                  <HeartFilled />
                ) : (
                  <HeartTwoTone twoToneColor="#a03f20" />
                )
              }
              value={props.album.favorite}
              allowClear
              style={{ color: "#a03f20", fontSize: "20px" }}
              count="1"
              tooltips={
                props.album.favorite
                  ? ["Remove album from favorites"]
                  : ["Add album to favorites"]
              }
              onChange={addToFavorite}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default AlbumCard;
