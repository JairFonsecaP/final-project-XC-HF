import React from "react";
import { Input } from "antd";
import axios from "axios";
import api from "../assets/api";

const { Search } = Input;

const SearchAlbum = props => {
  const onSearch = async value => {
    if (value !== "") {
      try {
        const { data } = await axios.get(`${api}album/getAlbum/${value}`, {
          headers: { token: props.token }
        });
        props.setList(data.results);
      } catch (e) {}
    } else {
      props.init();
    }
  };
  return (
    <Search
      placeholder="Enter a song"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  );
};

export default SearchAlbum;