import { useState } from 'react';
import { Button, Divider } from '@mui/material';
import { Add as AddIcon, Tune as TuneIcon } from '@mui/icons-material';

import { FilterItem } from './FilterItem';
import { Filter } from '../../types/Filters';

export function FilterSidebar(props: FilterSidebarProps) {
  const [filters, setFilters] = useState<Filter[]>([]);

  const addFilter = () => {
    setFilters([...filters, { type: "" }]);
  };
  const clearFilters = () => {
    setFilters([]);
  };
  const applyFilters = () => {
    
  };
  const setFilter = (index: number) => {
    return (filter: Filter) => {
      setFilters([...filters.slice(0, index), filter, ...filters.slice(index + 1)]);
    };
  };
  const removeFilter = (index: number) => {
    return () => {
      setFilters([...filters.slice(0, index), ...filters.slice(index + 1)]);
    };
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '10px', height: 'calc(100% - 20px)' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'left', marginBottom: '10px' }}>
        <TuneIcon style={{ verticalAlign: 'middle', marginRight: '10px' }} />
        Filters
      </div>
      <ul style={{ listStyleType: 'none', paddingLeft: 0, overflowY: 'auto', maxHeight: '70vh' /* workaround */ }}>
        {filters.map((filter, index) => (<FilterItem key={index} filter={filter} setFilter={setFilter(index)} removeFilter={removeFilter(index)} />))}
      </ul>
      <div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addFilter}>
          Add filter
        </Button>
      </div>
      <Divider style={{ margin: '10px 0'}} />
      <div style={{ textAlign: 'right', marginRight: '10px' }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#ced4da', color: 'black', marginRight: '10px' }}
          onClick={clearFilters}
        >
          Clear filters
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: '#52c400' }}
          onClick={applyFilters}
        >
          Apply filters
        </Button>
      </div>
    </div>
  );
}

export type FilterSidebarProps = {
  
};
