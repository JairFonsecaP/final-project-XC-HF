import React, { useState, useEffect } from 'react';
import { Card, Empty, Row, Col, Table } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../assets/api';

const { Column, ColumnGroup } = Table;

const AlbumDetail = (props) => {
    let { id } = useParams();
    const [album, setAlbum] = useState([]);
    const [errors, setErrors] = useState([]);

    const init = async () => {
        try {
            console.log(id);
            const { data } = await axios.get(`${api}album/detail/${id}`, {
                headers: { token: props.token }
            });
            console.log(data);
            setAlbum(data);
        } catch (e) {
            // if (e.response.data.errors) {
            //     setErrors(e.response.data.errors);
            // }
            console.error(e);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <>
            {album && album.length === 0 ? (
                <Empty />
            ) : (
                <Card
                    style={{
                        width: '100%'
                    }}
                    title={album.title}
                >
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
                            <h3>Artists</h3>
                            <ul>
                                {album.artists.map((element) => {
                                    return <li> {element.name} </li>;
                                })}
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <h3>Country</h3>
                        </Col>
                        <Col span={6}>
                            <p>{album.country}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <h3>Genres</h3>
                            <ul>
                                {album.genres.map((element) => {
                                    return <li> {element} </li>;
                                })}
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <h3>Styles</h3>
                            <ul>
                                {album.styles.map((element) => {
                                    return <li> {element} </li>;
                                })}
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <h3>Tracklist</h3>
                            <Table dataSource={album.tracklist}>
                                <Column
                                    title='Position'
                                    dataIndex='position'
                                    key='position'
                                />
                                <Column
                                    title='Title'
                                    dataIndex='title'
                                    key='title'
                                />
                                <Column
                                    title='Duration'
                                    dataIndex='duration'
                                    key='duration'
                                />
                            </Table>
                        </Col>
                    </Row>
                </Card>
            )}
        </>
    );
};

export default AlbumDetail;
