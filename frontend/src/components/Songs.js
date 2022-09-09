import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Empty } from 'antd';
import Alerts from './Alerts';
import api from '../assets/api';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import SearchSong from './SearchSong';
// import { Link } from 'react-router-dom';

const Songs = (props) => {
    const [list, setList] = useState([]);
    const [errors, setErrors] = useState([]);

    const init = async () => {
        try {
            const { data } = await axios.get(`${api}song/all`, {
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
            <SearchSong token={props.token} setList={setList} init={init} />
            {list.length === 0 ? (
                <Empty />
            ) : (
                <div className='site-card-wrapper'>
                    {errors.map((e, i) => (
                        <Alerts
                            error={e}
                            key={i + e.msg}
                            message={e.param}
                            desciption={e.msg}
                            type='error'
                        />
                    ))}

                    <Row gutter={16}>
                        {list.map((artist, i) => {
                            return (
                                <Col
                                    span={8}
                                    style={{ marginBottom: '10px' }}
                                    key={artist + i}
                                    title={artist.title}
                                >
                                    <Card title={artist.title} bordered={true}>
                                        {artist.cover_image !== '' ? (
                                            <img
                                                src={artist.cover_image}
                                                alt={artist.title}
                                                style={{
                                                    height: '150px',
                                                    width: '150px',
                                                    margin: '0 auto'
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

export default Songs;
