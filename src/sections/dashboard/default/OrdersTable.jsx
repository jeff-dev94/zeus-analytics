import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import { Button, Input, Space, Table } from 'antd';
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
    uid: '1231251231231232',
    coldkey: '5ch....d123',
    hotkey: '531....23w1',
    lastPredictionTime: '2025/10/28 15:30:25',
    score: 0.6,
    weight: 0.9
  },
  {
    key: '2',
    no: '23',
    uid: '1231251231231233',
    coldkey: '5ch....d124',
    hotkey: '531....23w2',
    lastPredictionTime: '2025/10/28 16:30:25',
    score: 0.5,
    weight: 0.2
  },
  {
    key: '3',
    no: '24',
    uid: '1531251231231232',
    coldkey: '5ch....d125',
    hotkey: '531....23w3',
    lastPredictionTime: '2025/10/28 17:30:25',
    score: 0.5,
    weight: 0.7
  },
  {
    key: '4',
    no: '25',
    uid: '1231251231231236',
    coldkey: '5ch....d126',
    hotkey: '531....23w4',
    lastPredictionTime: '2025/10/28 18:30:25',
    score: 0.3,
    weight: 0.9
  },
  {
    key: '5',
    no: '26',
    uid: '1231251231231237',
    coldkey: '5ch....d127',
    hotkey: '531....23w5',
    lastPredictionTime: '2025/10/28 19:30:25',
    score: 0.7,
    weight: 0.6
  },
  {
    key: '6',
    no: '27',
    uid: '1231251231231238',
    coldkey: '5ch....d128',
    hotkey: '531....23w6',
    lastPredictionTime: '2025/10/28 20:30:25',
    score: 0.2,
    weight: 0.8
  },
];

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
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
      title: 'Last Prediction Time',
      dataIndex: 'lastPredictionTime',
      key: 'lastPredictionTime',
      sorter: (a, b) => a.lastPredictionTime - b.lastPredictionTime,
      ...getColumnSearchProps('lastPredictionTime'),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
      ...getColumnSearchProps('score'),
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a, b) => a.weight - b.weight,
      ...getColumnSearchProps('weight'),
    },
  ];

  return (
    <Box>
      <Table dataSource={dataSource} columns={columns} />;
    </Box>
  );
}
