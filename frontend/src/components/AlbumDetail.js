import React, { useState, useEffect } from "react";
import {
  Card,
  Empty,
  Row,
  Col,
  Table,
  List,
  Descriptions,
  Divider,
  Spin
} from "antd";
import { YoutubeOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../assets/api";
import Alerts from "../components/Alerts";

const { Column, ColumnGroup } = Table;

const AlbumDetail = props => {
  let { id } = useParams();
  const [album, setAlbum] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const tabList = [
    {
      key: "tab1",
      tab: "Tracklist"
    },
    {
      key: "tab2",
      tab: "Videos"
    }
  ];
  const contentList = {
    tab1: (
      <>
        <Table key="tracklistTable" dataSource={album.tracklist}>
          <Column title="Position" dataIndex="position" key="position" />
          <Column title="Title" dataIndex="title" key="title" />
          <Column title="Duration" dataIndex="duration" key="duration" />
        </Table>
      </>
    ),
    tab2: (
      <>
        <List
          bordered
          dataSource={album.videos}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <a href={item.uri} target="_blank">
                    <YoutubeOutlined />
                  </a>
                }
                title={item.title}
              />
            </List.Item>
          )}
        />
      </>
    )
  };
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = key => {
    setActiveTabKey1(key);
  };
  const onTab2Change = key => {
    setActiveTabKey2(key);
  };

  const init = async () => {
    setErrors([]);
    setLoading(true);
    try {
      const { data } = await axios.get(`${api}album/detail/${id}`, {
        headers: { token: props.token }
      });
      setAlbum(data);
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
      {errors.map((e, i) => (
        <Alerts
          error={e}
          key={i + e.msg}
          message={e.param}
          desciption={e.msg}
          type="error"
        />
      ))}
      {album && album.length === 0 ? (
        <Empty />
      ) : (
        <Card
          style={{
            width: "100%"
          }}
          title={album.title}
          key={album.title}
        >
          <Row>
            <Col span={4}>
              <h3>Country</h3>
            </Col>
            <Col span={6}>
              <p>{album.country}</p>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <h3>Released</h3>
            </Col>
            <Col span={6}>
              <p>{album.released}</p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Descriptions title="Artists" bordered>
                {album.artists.map((element, i) => {
                  return (
                    <Descriptions.Item key={"artists_" + i}>
                      {element.name}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Descriptions title="Genres" bordered>
                {album.genres.map((element, i) => {
                  return (
                    <Descriptions.Item key={"genre_" + i}>
                      {element}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Descriptions title="Styles" bordered>
                {album.styles.map((element, i) => {
                  return (
                    <Descriptions.Item key={"styles_" + i}>
                      {element}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </Col>
          </Row>
          <Divider orientation="left"></Divider>
          <Row>
            <Col>
              <Card
                style={{
                  width: "75vw"
                }}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={key => {
                  onTab1Change(key);
                }}
              >
                {contentList[activeTabKey1]}
              </Card>
            </Col>
          </Row>
        </Card>
      )}
    </Spin>
  );
};

export default AlbumDetail;
