import React, { useState, useEffect } from "react";
import { Card, Col, Row, Empty } from "antd";
import Alerts from "./Alerts";
import api from "../assets/api";
import axios from "axios";
import SearchAlbum from "./SearchAlbum";
import AlbumCard from "./AlbumCard";

const Albums = props => {
  const [list, setList] = useState([]);
  const [errors, setErrors] = useState([]);

  const init = async () => {
    try {
      const { data } = await axios.get(`${api}album/favorites`, {
        headers: { token: props.token }
      });

      setList(data);
    } catch (e) {
      const Errors = e.response.data.errors;
      if (Errors) {
        setErrors(Errors);
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <SearchAlbum token={props.token} setList={setList} init={init} />
      {list && list.length === 0 ? (
        <Empty />
      ) : (
        <div className="site-card-wrapper">
          {errors.map((e, i) => (
            <Alerts
              error={e}
              key={i + e.msg}
              message={e.param}
              desciption={e.msg}
              type="error"
            />
          ))}
          <h1>My Favorite Albums</h1>

          <Row gutter={16}>
            {list &&
              list.map((album, i) => {
                return (
                  <Col
                    span={8}
                    style={{ marginBottom: "10px" }}
                    key={album + i}
                    title={album.title}
                  >
                    <AlbumCard album={album} />
                  </Col>
                );
              })}
          </Row>
        </div>
      )}
    </>
  );
};

export default Albums;
