import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import { Table } from 'antd';

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
    no: '22',
    uid: '1231251231231233',
    coldkey: '5ch....d124',
    hotkey: '531....23w2',
    lastPredictionTime: '2025/10/28 16:30:25',
    score: 0.5,
    weight: 0.2
  },
  {
    key: '3',
    no: '22',
    uid: '1531251231231232',
    coldkey: '5ch....d125',
    hotkey: '531....23w3',
    lastPredictionTime: '2025/10/28 17:30:25',
    score: 0.5,
    weight: 0.7
  },
  {
    key: '4',
    no: '22',
    uid: '1231251231231236',
    coldkey: '5ch....d126',
    hotkey: '531....23w4',
    lastPredictionTime: '2025/10/28 18:30:25',
    score: 0.3,
    weight: 0.9
  },
  {
    key: '5',
    no: '22',
    uid: '1231251231231237',
    coldkey: '5ch....d127',
    hotkey: '531....23w5',
    lastPredictionTime: '2025/10/28 19:30:25',
    score: 0.7,
    weight: 0.6
  },
  {
    key: '6',
    no: '22',
    uid: '1231251231231238',
    coldkey: '5ch....d128',
    hotkey: '531....23w6',
    lastPredictionTime: '2025/10/28 20:30:25',
    score: 0.2,
    weight: 0.8
  },
];

const columns = [
  {
    title: '#',
    dataIndex: 'no',
    key: 'no',
    sorter: (a, b) => a.no - b.no,
  },
  {
    title: 'UID',
    dataIndex: 'uid',
    key: 'uid',
    sorter: (a, b) => a.uid - b.uid,
  },
  {
    title: 'Coldkey',
    dataIndex: 'coldkey',
    key: 'coldkey',
    sorter: (a, b) => a.coldkey - b.coldkey,
  },
  {
    title: 'Hotkey',
    dataIndex: 'hotkey',
    key: 'hotkey',
    sorter: (a, b) => a.hotkey - b.hotkey,
  },
  {
    title: 'Last Prediction Time',
    dataIndex: 'lastPredictionTime',
    key: 'lastPredictionTime',
    sorter: (a, b) => a.lastPredictionTime - b.lastPredictionTime,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    sorter: (a, b) => a.score - b.score,
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
    sorter: (a, b) => a.weight - b.weight,
  },
];

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {

  return (
    <Box>
      <Table dataSource={dataSource} columns={columns} />;
    </Box>
  );
}
