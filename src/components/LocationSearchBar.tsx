import {
  AimOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Row, Input, Tooltip } from "antd";
import { useState } from "react";
import { LocationSearchProp } from "../types";

const iconStyle = {
  fontSize: "18px",
  height: "40px",
  width: "40px",
};

function LocationSearchBar({
  onSearch,
  onLocate,
  onShow,
  visible,
}: LocationSearchProp) {
  const [typing, setTyping] = useState<string>("");

  const onTyping = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyping(e.target.value);
  };
  return (
    <Row
      style={{
        zIndex: 9999,
        position: "fixed",
        top: 10,
        left: 10,
        height: "40px",
        backgroundColor: "#fff",
        lineHeight: "40px",
        borderRadius: "0px 12px 12px 0px",
        boxShadow: "1px 3px 2px 1px rgba(0,0,0,0.1)",
        width: "304px",
      }}
    >
      <Col>
        <Tooltip
          title="Search History"
          arrowPointAtCenter
          placement="bottomLeft"
        >
          <MenuUnfoldOutlined
            style={iconStyle}
            onClick={() => onShow(!visible)}
          />
        </Tooltip>
      </Col>
      <Col>
        <Input
          placeholder="Enter Location...."
          value={typing}
          onChange={onTyping}
          onPressEnter={() => onSearch(typing)}
          bordered={false}
          autoFocus={true}
        />
      </Col>
      <Col>
        <Tooltip title="Search" arrowPointAtCenter placement="bottomLeft">
          <SearchOutlined onClick={() => onSearch(typing)} style={iconStyle} />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Self Locate" placement="bottomLeft" arrowPointAtCenter>
          <AimOutlined style={iconStyle} onClick={onLocate} />
        </Tooltip>
      </Col>
    </Row>
  );
}

export default LocationSearchBar;
