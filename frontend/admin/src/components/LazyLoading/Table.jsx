import React, { useReducer, useEffect, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import { Grid, VirtualTable, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { VirtualTableState, createRowCache } from '@devexpress/dx-react-grid';

const VIRTUAL_PAGE_SIZE = 50;

const initialState = {
  rows: [],
  skip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: '',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case 'UPDATE_ROWS':
      return { ...state, ...payload, loading: false };
    case 'START_LOADING':
      return { ...state, ...payload };
    case 'FETCH_INIT':
      return { ...state, loading: true };
    case 'REQUEST_ERROR':
      return { ...state, loading: false };
    case 'UPDATE_QUERY':
      return { ...state, lastQuery: payload };
    default:
      return state;
  }
}

export default function LazyLoadingTable({ columns, fetchData }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE), []);

  const getRemoteRows = (requestedSkip, take) => {
    dispatch({ type: 'START_LOADING', payload: { skip: requestedSkip, take } });
    const cached = cache.getRows(requestedSkip, take);
  
    if (cached.length === take) {
      setTimeout(() => {
        dispatch({ type: 'UPDATE_ROWS', payload: { rows: cached, skip: requestedSkip } });
      }, 5000); 
    } else {
      dispatch({ type: 'FETCH_INIT' });
      fetchData(requestedSkip, take)
        .then(({ data, totalCount }) => {
          cache.setRows(requestedSkip, data);
          setTimeout(() => {
            dispatch({
              type: 'UPDATE_ROWS',
              payload: { rows: data, skip: requestedSkip, totalCount },
            });
          }, 500); 
        })
        .catch(() => dispatch({ type: 'REQUEST_ERROR' }));
    }
  };
  

  const { rows, skip, totalCount, loading } = state;

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <VirtualTableState
          infiniteScrolling
          loading={loading}
          totalRowCount={totalCount}
          pageSize={VIRTUAL_PAGE_SIZE}
          skip={skip}
          getRows={getRemoteRows}
        />
        <VirtualTable />
        <TableHeaderRow />
      </Grid>
    </Paper>
  );
}
