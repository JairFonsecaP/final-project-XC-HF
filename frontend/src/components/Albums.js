import React, { useState, useEffect } from "react";
import { Col, Row, Empty, Spin } from "antd";
import Alerts from "./Alerts";
import api from "../assets/api";
import axios from "axios";
import SearchAlbum from "./SearchAlbum";
import AlbumCard from "./AlbumCard";

const Albums = props => {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState([]);
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const init = async () => {
    setErrors([]);
    setLoading(true);
    try {
      const { data } = await axios.get(`${api}album/favorites`, {
        headers: { token: props.token }
      });
      setTitle("My Favorite Albums");
      setList(data);
    } catch (e) {
      if (e.response.data.errors) {
        setErrors(e.response.data.errors);
      } else {
        setErrors(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Spin spinning={loading}>
      <SearchAlbum
        token={props.token}
        setList={setList}
        setTitle={setTitle}
        setValue={setValue}
        value={value}
        init={init}
        setLoading={setLoading}
        setErrors={setErrors}
      />
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
          <h1>{title}</h1>

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
                    <AlbumCard
                      album={album}
                      token={props.token}
                      value={value}
                      init={init}
                      setValue={setValue}
                      setLoading={setLoading}
                      setErrors={setErrors}
                    />
                  </Col>
                );
              })}
          </Row>
        </div>
      )}
    </Spin>
  );
};

export default Albums;
