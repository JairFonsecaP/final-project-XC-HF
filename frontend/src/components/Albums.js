import React, { useState, useEffect } from "react";
import { Card, Col, Row, Empty } from "antd";
import Alerts from "./Alerts";
import api from "../assets/api";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import SearchAlbum from "./SearchAlbum";

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
      {list.length === 0 ? (
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
            {list.map((album, i) => {
              return (
                <Col
                  span={8}
                  style={{ marginBottom: "10px" }}
                  key={album + i}
                  title={album.title}
                >
                  <Card body title={album.title} bordered={true}>
                    {album.cover_image !== "" ? (
                      <img
                        src={album.cover_image}
                        alt={album.title}
                        style={{
                          height: "150px",
                          width: "150px",
                          margin: "0 auto"
                        }}
                      />
                    ) : (
                      <UserOutlined />
                    )}
                  </Card>
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
