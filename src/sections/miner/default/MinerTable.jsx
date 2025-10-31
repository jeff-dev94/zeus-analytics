import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import { ConfigProvider, Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';

const dataSource = [
  {
    key: '1',
    no: '22',
    challengeID: '1',
    uid: '1231251231231232',
    coldkey: '5ch....d123',
    hotkey: '531....23w1',
    time: '2025/10/28 15:30:25',
    scored: 'false',
    prevScore: 0.6,
    scatteredScore: 0.6,
    newScore: 0.6
  },
  {
    key: '2',
    no: '23',
    challengeID: '4',
    uid: '1231251231231233',
    coldkey: '5ch....d124',
    hotkey: '531....23w2',
    time: '2025/10/28 16:30:25',
    scored: 'true',
    prevScore: 0.5,
    scatteredScore: 0.5,
    newScore: 0.5
  },
  {
    key: '3',
    no: '24',
    challengeID: '5',
    uid: '1531251231231232',
    coldkey: '5ch....d125',
    hotkey: '531....23w3',
    time: '2025/10/28 17:30:25',
    scored: 'true',
    prevScore: 0.5,
    scatteredScore: 0.5,
    newScore: 0.5
  },
  {
    key: '4',
    no: '25',
    challengeID: '7',
    uid: '1231251231231236',
    coldkey: '5ch....d126',
    hotkey: '531....23w4',
    time: '2025/10/28 18:30:25',
    scored: 'false',
    prevScore: 0.3,
    scatteredScore: 0.3,
    newScore: 0.3
  },
  {
    key: '5',
    no: '26',
    challengeID: '11',
    uid: '1231251231231237',
    coldkey: '5ch....d127',
    hotkey: '531....23w5',
    time: '2025/10/28 19:30:25',
    scored: 'false',
    prevScore: 0.7,
    scatteredScore: 0.7,
    newScore: 0.7
  },
  {
    key: '6',
    no: '27',
    challengeID: '18',
    uid: '1231251231231238',
    coldkey: '5ch....d128',
    hotkey: '531....23w6',
    time: '2025/10/28 20:30:25',
    scored: 'true',
    prevScore: 0.2,
    scatteredScore: 0.2,
    newScore: 0.2
  },
];

// ==============================|| ORDER TABLE ||============================== //

export default function MinerTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

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

  const columns = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      sorter: (a, b) => a.no - b.no,
      ...getColumnSearchProps('no'),
    },
    {
      title: 'Challenge ID',
      dataIndex: 'challengeID',
      key: 'challengeID',
      sorter: (a, b) => a.challengeID - b.challengeID,
      ...getColumnSearchProps('challengeID'),
    },
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
      sorter: (a, b) => a.uid - b.uid,
      ...getColumnSearchProps('uid'),
    },
    {
      title: 'Coldkey',
      dataIndex: 'coldkey',
      key: 'coldkey',
      sorter: (a, b) => a.coldkey - b.coldkey,
      ...getColumnSearchProps('coldkey'),
    },
    {
      title: 'Hotkey',
      dataIndex: 'hotkey',
      key: 'hotkey',
      sorter: (a, b) => a.hotkey - b.hotkey,
      ...getColumnSearchProps('hotkey'),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => a.time - b.time,
      ...getColumnSearchProps('time'),
    },
    {
      title: 'Scored',
      dataIndex: 'scored',
      key: 'scored',
      sorter: (a, b) => a.scored - b.scored,
      ...getColumnSearchProps('scored'),
    },
    {
      title: 'Prev Score',
      dataIndex: 'prevScore',
      key: 'prevScore',
      sorter: (a, b) => a.prevScore - b.prevScore,
      ...getColumnSearchProps('prevScore'),
    },
    {
      title: 'Scattered Score',
      dataIndex: 'scatteredScore',
      key: 'scatteredScore',
      sorter: (a, b) => a.scatteredScore - b.scatteredScore,
      ...getColumnSearchProps('scatteredScore'),
    },
    {
      title: 'New Score',
      dataIndex: 'newScore',
      key: 'newScore',
      sorter: (a, b) => a.newScore - b.newScore,
      ...getColumnSearchProps('newScore'),
    },
  ];

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
                bordered
                dataSource={dataSource}
                columns={columns}
                // onRow={(record, rowIdx) => {
                //   return {
                //     onClick: (event) => {
                //       navigate(`/miners/${record.no}`)
                //     }
                //   }
                // }}
            />
      </ConfigProvider>
    </Box>
  );
}
