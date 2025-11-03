import { useState, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import { ConfigProvider, Button, Input, Space, Table } from 'antd';
import { createStyles } from 'antd-style';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

let dataSource = [];
for (let i = -90; i <= 90; i += 0.25) {
    let oneRow = {
        key: i.toString(),
        rowHeader: i.toString(),
    }
    for (let j = -180; j <= 180; j += 0.25) {
        oneRow[j.toString()] = j.toString();
    }
    dataSource.push(oneRow)
}


// ==============================|| ORDER TABLE ||============================== //

export default function AnalyticsTable() {
  const navigate = useNavigate();
  const { id: minderID } = useParams();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const { styles } = useStyle();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys)[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  let columns = [
    { title: "", dataIndex: "rowHeader", key: "rowHeader", fixed: "left", width: 100 },
  ]
  for (let i = -180; i <= 180; i += 0.25) {
    if (i === -180) {
        columns.push({
            title: parseFloat(i.toFixed(2)).toString(),
            dataIndex: parseFloat(i.toFixed(2)).toString(),
            key: parseFloat(i.toFixed(2)).toString(),
            fixed: 'left',
            width: 80,
        })
    } else if (i === 180) {
        columns.push({
            title: parseFloat(i.toFixed(2)).toString(),
            dataIndex: parseFloat(i.toFixed(2)).toString(),
            key: parseFloat(i.toFixed(2)).toString(),
            fixed: 'right',
            width: 80,
        });    
    } else {
        columns.push({
            title: parseFloat(i.toFixed(2)).toString(),
            dataIndex: parseFloat(i.toFixed(2)).toString(),
            key: parseFloat(i.toFixed(2)).toString(),
            width: 80,
        });
    }
  }

  return (
    <Box>
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                    // vertical padding (top + bottom) inside cells
                    cellPaddingBlock: 8,    // px
                    // horizontal padding (left + right) inside cells
                    cellPaddingInline: 8,   // px
                    // optional: header-only padding
                    headerCellPaddingBlock: 8,
                    headerCellPaddingInline: 8,
                    },
                },
            }}
        >
            <Table
                className={styles.customTable}
                bordered
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: 'max-content' }}
                rowClassName={() => "row-header-table"}
                // onRow={(record, rowIdx) => {
                //   return {
                //     onClick: (event) => {
                //       navigate(`/miners/${minderID}/analytics/${record.uid}`)
                //     }
                //   }
                // }}
            />
      </ConfigProvider>
    </Box>
  );
}
