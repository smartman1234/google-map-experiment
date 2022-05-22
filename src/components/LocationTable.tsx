import { DeleteFilled } from "@ant-design/icons";
import { Drawer, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { LocationTableProp, SearchHistory } from "../types";

function LocationTable({
  historyData,
  onDelete,
  onShow,
  visible,
}: LocationTableProp) {
  const [recordKey, setRecordKey] = useState<React.Key[]>([]);
  useEffect(() => {}, [historyData]);
  const columns = [
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Time Zone",
      dataIndex: "timeZone",
    },
    {
      title: "Local Time",
      dataIndex: "localTime",
    },
  ];

  const rowSelection = {
    onChange: (rowKey: React.Key[]) => {
      console.log(`selectedRowKeys: ${rowKey}`);
      setRecordKey(rowKey);
    },
    onSelect: (record: SearchHistory) => {
      console.log(record);
    },
  };

  return (
    <Drawer
      placement="left"
      title="Search History"
      width={600}
      height="100%"
      onClose={() => onShow(false)}
      visible={visible}
      mask={false}
      style={{
        margin: "50px 0px 0px 0px ",
      }}
    >
      <Tooltip title="Delete Record" placement="bottom">
        <DeleteFilled
          style={{ fontSize: "18px", color: "#F32424", padding: "8px" }}
          onClick={() => onDelete(recordKey)}
        />
      </Tooltip>
      <Table
        rowSelection={{ ...rowSelection }}
        columns={columns}
        dataSource={historyData}
        size="small"
      />
    </Drawer>
  );
}

export default LocationTable;
