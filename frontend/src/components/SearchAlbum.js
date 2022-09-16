import React from "react";
import { Input } from "antd";
import axios from "axios";
import api from "../assets/api";

const { Search } = Input;

const SearchAlbum = props => {
  const onSearch = async value => {
    props.setErrors([]);
    props.setLoading(true);
    if (value !== "") {
      try {
        const { data } = await axios.get(`${api}album/getAlbum/${value}`, {
          headers: { token: props.token }
        });
        props.setList(data);
        props.setValue(value);
        props.setTitle(`Results for "${value}"`);
      } catch (e) {
        if (e.response.data.errors) {
          props.setErrors(e.response.data.errors);
        } else {
          props.setErrors(e.message);
        }
      } finally {
        props.setLoading(false);
      }
    } else {
      props.init();
    }
  };
  return (
    <Search
      placeholder="Enter an album"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  );
};

export default SearchAlbum;
